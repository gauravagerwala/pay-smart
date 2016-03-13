var express = require('express');
var _ = require('underscore');
var db = require('./../db.js');

var router = express.Router();

router.post('/', function(req, res) {
	var body = _.pick(req.body, 'email', 'name', 'password', 'user_type');

	db.user.create(body).then(function(user){
		res.json(user);
	}, function(e){
		res.sendStatus(400);
	});
});


module.exports = router;