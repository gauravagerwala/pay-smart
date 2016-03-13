
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
		}
	});
}