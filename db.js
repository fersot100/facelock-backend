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
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    });
}

var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.site = sequelize.import(__dirname + '/models/site.js');
db.face = sequelize.import(__dirname + '/models/face.js');

db.site.belongsTo(db.user);
db.face.belongsTo(db.user);

db.user.hasMany(db.site);
db.user.hasMany(db.face);

module.exports = db;
