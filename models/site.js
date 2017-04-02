module.exports = function(sequelize, DataTypes) {
	var site = sequelize.define('site', {
		url: {
			type: DataTypes.STRING,

		},
		username: {
			type: DataTypes.STRING,

		},
		password: {
			type: DataTypes.STRING,

		}
	}, {
		classMethods: {
			create_sites: function (sites, uid) {
				var _this = this;
				var result = [];
				var Promises = sites.map(function(site){
					return _this.create({
						url: site.url,
						name: site.name,
						password: site.password,
						userId: uid
					}).then(function() {
						result.push({
							site: site,
							success: true
						});
						user.addSite(site).then(function() {
							return user.reload();
						});
					}).catch(function(err) {
						result.push({
							site: site,
							success: false
						});
						return Promise.resolve();
					});
				});
				return Promise.all(Promises).then(function() {
					return Promise.resolve(result);
				});
			}
		}
	});
	return site;
};
	