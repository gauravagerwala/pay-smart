var Sequelize = require('sequelize');

sequelize = new Sequelize(undefined,undefined,undefined,{
	dialect: 'sqlite',
	storage: __dirname + '/data/dev-pay-smart.sql'
});

var db = {};

db.item = sequelize.import(__dirname + '/models/item.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;