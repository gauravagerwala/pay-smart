var bcrypt = require('bcrypt');
var _ = require('underscore');
var crypto = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user',{
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
		}, {
			instanceMethods: {
			toPublicJSON: function(){
				var json = this.toJSON();
				return _.pick(json, 'id', 'email', 'updatedAt', 'createdAt');
			},
			generateToken: function(type){
				if(!_.isString(type)){
					return undefined;
				}

				try{
					var stringData = JSON.stringify({id: this.get('id'), type: type});
					var encrytedData = crypto.AES.encrypt(stringData, 'abcdefgh123!@#').toString();
					var token = jwt.sign({
						token: encrytedData
					}, 'qwerty012');

					return token;					

					} catch(e){
						return undefined;
					}
				}
			},
			classMethods: {
				authenticate: function(body){
					return new Promise(function(resolve, reject){
						if(!_.isString(body.email) || !_.isString(body.password)){
							return reject();
						}

						user.findOne({
							where: {
								email: body.email
							}
						}).then(function(user){
							if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
								return reject();
							}
							resolve(user);
						}, function (e) {
							reject();
						});
					});
				},
				findByToken: function(token){
					return new Promise( function(resolve, reject){
						try{
							var decodedJWT = jwt.verify(token, 'qwerty012');
							var bytes = crypto.AES.decrypt(decodedJWT.token, 'abcdefgh123!@#');
							var tokenData = JSON.parse(bytes.toString(crypto.enc.Utf8));

							user.findById(tokenData.id).then( function(user){
								if(user){
									resolve(user);
								}else{
									reject();
								}

							}, function(e){
								reject();
							});						
						}catch(e){
							reject();
						}
					});
				}

			}
		}

	);	
	return user;
};