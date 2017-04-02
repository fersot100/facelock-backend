var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var _ = require('lodash');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', function(req,res) {
	var user = _.pick(req.body, 'name' , 'email', 'password', 'pi', 'pgi');	
	var sites = _.pick(req.body, 'sites').sites;
	var faceIds = _.pick(req.body, 'faceIds').faceIds;
	var userId;

	db.user.create(user).then(function (user) {
		userId = user.get('id');
		db.site.create_sites(sites, userId).then(function(){
			console.log("It hits!");
			db.faceId.create_faceIds(faceIds, userId).then(function(){
				res.json(user.toJSON());
			},function(err) {
				console.log('Error adding FaceId ' + index + ' to user');
				res.status(400).json(err);
			});
		},function(err) {
			console.log('Error adding Site ' + index + ' to user');
			res.status(400).json(err);
		});
	}, function (err) {
		console.log('Error adding user' + user.name);
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
