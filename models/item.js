module.exports = function(sequelize, DataTypes){
	return sequelize.define('item',{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		company: {
			type: DataTypes.STRING
		},
		available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		bar_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bar_code_format: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: true
		}
	});
}
