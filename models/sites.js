module.exports = function(sequelize, DataTypes) {
	var site = sequelize.define('site' {
		url: {
			type: DataTypes.STRING,
			isNull: false,
			validate: {
				isURL: true
			}
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			len: [2, 254]

		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});
	return site;
}