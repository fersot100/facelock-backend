var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/facelock.sqlite'
    });
}

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.site = sequelize.import(__dirname + '/models/site.js');
db.faceId = sequelize.import(__dirname + '/models/faceId.js');

db.site.belongsTo(db.user);
db.faceId.belongsTo(db.user);

db.user.hasMany(db.site);
db.user.hasMany(db.faceId);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
