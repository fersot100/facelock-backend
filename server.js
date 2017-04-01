var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var faces = [];

app.use(bodyParser.json());

app.post('/', function(req,res) {
	var user = _.pick(req.body, 'user');
	var site = _.pick(req.body, 'site');
	var faceId = _.pick(req.body, 'faceId');

	//TODO: MUST SHOW OWNERSHIP

	db.user.create(user).then(function (user) {
		res.json(faceData.toPublicJSON());
	}, function (err) {
		res.status(400).json(err);
	});


	db.faceId.create(faceId).then(function (user) {
		res.json(faceData.toPublicJSON());
	}, function (err) {
		res.status(400).json(err);
	});
	db.site.create(site).then(function (user) {
		res.json(faceData.toPublicJSON());
	}, function (err) {
		res.status(400).json(err);
	});
	
});

db.sequelize.sync({
	force: true
}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});

