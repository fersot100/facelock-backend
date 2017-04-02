var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var _ = require('lodash');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/users', function(req,res) {
	console.log('\nreq.body = ' + JSON.stringify(req.body) + "\n");
	var user = _.pick(req.body, 'name' , 'email', 'password');
	console.log("\nUser recognized as " + user.name + "\n");
	var sites = _.pick(req.body, 'sites').sites;
	var faceIds = _.pick(req.body, 'faceIds').faceIds;
	var userId;
	
	console.log('\nsites and faceIds' + JSON.stringify(sites) + "\n" + JSON.stringify(faceIds) + "\n");

	//TODO: MUST SHOW OWNERSHIP\
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
		// for (var i = sites.length - 1; i >= 0; i--) {
		// 	console.log('ran user code\n');
		// 	db.site.create(sites[i]).then(function(site) {
		// 		user.addSite(site);
		// 		console.log("Site " + site.name + " Added");
		// 	}, function(err) {
		// 		console.log('Error adding Site ' + index + ' to user');
		// 		res.status(400).json(err);
		// 	});
		// }
		// for (var i = faceIds.length - 1; i >= 0; i--) {
		// 	db.faceId.create(faceIds[i]).then(function(faceId){
		// 		user.addFaceId(faceId);
			// }, function(err) {
			// 	console.log('Error adding FaceId ' + index + ' to user');
			// 	res.status(400).json(err);
			// });
		// }
		// //Potential issue with not using (then) let's test
		// res.json(user.toJSON());
db.sequelize.sync({
	force: true
}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});
