var Sequelize = require('sequelize');

sequelize = new Sequelize(undefined,undefined,undefined,{
	'dialect': 'sqlite',
	'storage': '/data/dev-pay-smart.sql'
});

var db = {};

db.item = sequelize.import(__dirname + 'models/item.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;