//Declares faceId model as a string
module.exports = function (sequelize, DataTypes) {
	var faceId = sequelize.define('faceId' , {
		type: DataTypes.STRING,
	});
	return faceId;
}