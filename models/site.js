module.exports = function(sequelize, DataTypes) {
	var site = sequelize.define('site', {
		url: {
			type: DataTypes.STRING,
			isNull: false,
			validate: {
				isURL: true
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [2, 254]

		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		classMethods: {
			create_sites: function (sites, userId) {
				var _this = this;
				var result = [];
				var Promises = sites.map(function(site){
					return _this.create({
						url: site.url,
						name: site.name,
						password: site.password
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
	