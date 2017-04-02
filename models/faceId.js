//Declares faceId model as a string
module.exports = function (sequelize, DataTypes) {
	var face = sequelize.define('faceId' , {
		faceId: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		classMethods: {
			create_faceIds: function(faces, uid) {
				var _this = this;
				var result = [];
				var Promises = faces.map(function(face){
					return _this.create({
						faceId : face, 
						userId : uid
					}).then(function(){
						result.push({faceId : face, success: true});
						user.addFaceId(face).then(function() {
							return user.reload();
						});
					}).catch(function(err) {
						result.push({faceId : face, success: false});
						return Promise.resolve();
					});
				});
				return Promise.all(Promises).then(function() {
					return Promise.resolve(result);
				});
			}
		}
	});
	return face;
}