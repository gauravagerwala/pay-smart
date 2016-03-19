var express = require('express');
var _ = require('underscore');
var db = require('./../db.js');

var router = express.Router();

router.post('/', function(req, res) {
	var body = _.pick(req.body, 'email', 'name', 'password', 'user_type');

	db.user.create(body).then(function(user){
		var user = _.pick(user, 'email', 'name', 'createdAt', 'updatedAt', 'user_type');
		res.json(user);
	});

});

router.post('/login', function(req, res){
	var body = _.pick(req.body, 'email', 'password');

});

module.exports = router;