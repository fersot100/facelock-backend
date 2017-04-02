module.exports = function (sequelize, DataTypes) {
	var user = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false						
		},
		pi: {
			type: DataTypes.STRING
		},
		pgi: {
			type: DataTypes.STRING
		}

	});
	return user;	
};