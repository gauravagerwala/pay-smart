var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

var itemRoutes = require(path.join(__dirname ,'routes','items.js'));
var userRoutes = require(path.join(__dirname ,'routes','users.js'));

app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.send('pay-smart API root');
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

db.sequelize.sync().then( function () {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});

