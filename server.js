var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var _ = require('lodash');
// var cors = require('cors');

var app = express();
// app.use(cors());
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

app.get('/login', function(req, res){
	var userId = _.pick(req.body, 'userId');
	var password = _.pick(req.body, 'password');
	db.user.findOne({where: user.id == userId}).then(function(user) {
 		if (user.password == password) {
 			res.json(user);
 		} else {
 			res.json("Wrong password");
 		}
 	}, function	(e) {
 		res.json(e);
 	});
});	

app.post('/users', function(req,res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var user = _.pick(req.body, 'name' , 'email', 'password', 'pi', 'pgi');	
	var sites = _.pick(req.body, 'sites').sites;
	var faceIds = _.pick(req.body, 'faceIds').faceIds;
	var userId;

	db.user.create(user).then(function (user) {
		userId = user.get('id');
		db.site.create_sites(sites, userId).then(function(){
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

app.put('/users/sites/:id', function(req, res) {
	var user = _.pick(req.body, 'name' , 'email', 'password', 'pi', 'pgi');	
	var sites = _.pick(req.body, 'sites').sites;
	var faceIds = _.pick(req.body, 'faceIds').faceIds;
	var userId = parseInt(req.params.id, 10);

	var attributes = {};
	var appendants = {};

	if (user.hasOwnProperty('name')) {
		attributes.name = user.name;
	}
	if (user.hasOwnProperty('email')) {
		attributes.email = user.email;
	}
	if (user.hasOwnProperty('password')) {
		attributes.password = user.password;
	}
	if (user.hasOwnProperty('sites')) {
		appendants.sites = user.sites;
	}
	if (user.hasOwnProperty('faceIds')) {
		appendants.faceIds = user.faceIds;
	}

	db.user.findOne({
		where: {
			id: userId,
		}
	}).then(function(user){
		if(user) {
			user.update(attributes).then(function(user) {
				if(appendants.sites) {
					user.sites.concat(appendants.sites);
				}
				if(appendants.faceIds) {
					user.faceIds.concat(appendants.faceIds);
				}
				return user.reload();
			}).then(function(user){
				res.json(user);
			}, function(e) {
				res.status(500);
			});
		}else {
			res.status(404);
		}
	})
});

app.get("/users", function(req, res) {
	db.user.findAll().then(function(users){
		res.json(users);
	}), function(e) {
		res.status(e);
	}
});

db.sequelize.sync({
	force: false
}).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});
