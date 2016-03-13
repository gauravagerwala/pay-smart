var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user',{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		user_type: {
			type: DataTypes.STRING,
			validate: {
				isIn: [['customer','employee','manager']]
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7,100]
			},
			set: function(value) {
				var salt = bcrypt.genSaltSync(10);
				var hasedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hasedPassword);
			}
		}
	});	
};