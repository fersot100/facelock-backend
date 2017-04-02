module.exports = function (sequelize, DataTypes) {
	var user = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,

		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
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