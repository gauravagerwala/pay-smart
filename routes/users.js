var express = require('express');
var _ = require('underscore');
var db = require('./../db.js');

var router = express.Router();

router.get('/', function(req,res){
	res.send("Root of user API");
})

router.post('/', function(req, res) {
	var body = _.pick(req.body, 'email', 'name', 'password', 'user_type');

	db.user.create(body).then(function(user){
		var user = _.pick(user, 'email', 'name', 'createdAt', 'updatedAt', 'user_type');
		res.json(user);
	});

});

router.post('/login', function(req, res){
	var body = _.pick(req.body, 'email', 'password');
	console.log('Cjeck');
	var userInstance;
	db.user.authenticate(body).then(function(user){
		var token = user.generateToken('authentication');
		userInstance = user;
		return db.token.create({
			token: token
		});
	}).then(function (tokenInstance) {
		res.header('Auth', tokenInstance.token).json(userInstance.toPublicJSON());
	}).catch(function(e) {
		console.log(e);
		res.status(401).send(e);
	});
});



module.exports = router;