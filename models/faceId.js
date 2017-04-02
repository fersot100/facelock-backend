//Declares faceId model as a string
module.exports = function (sequelize, DataTypes) {
	var faceId = sequelize.define('faceId' , {
		type: DataTypes.STRING,
	}, {
		classMethods: {

			create_faceIds: function(faces, userId) {
				var _this = this;
				var result = [];
				var Promises = faces.map(function(faceId){
					return _this.create(faceId).then(function(){
						result.push({faceId : faceId, success: true});
						user.addFaceId(faceId).then(function() {
							return user.reload();
						});
					}).catch(function(err) {
						result.push({faceId : faceId, success: false});
						return Promise.resolve();
					});
				});
				return Promise.all(Promises).then(function() {
					return Promise.resolve(result);
				});
			}
		}
	});
	return faceId;
}