module.exports = function (sequelize, DataTypes) {
	var site = sequelize.define('site' , {
		type: DataTypes.STRING,
		validate: {
			isArray: true
		}
	});
	return site;
}