var express = require('express');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function(req,res) {
	res.send('pay-smart API root');
});

db.sequelize.sync().then( function () {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});

