'use strict';
var User = require('../models/user.js');
module.exports = {

	findAll : function(req, res) {
		console.log('Retrieving All users..');
		User.find({}, function(err, usersResult) {
			if( err || !usersResult) 
			{
				console.log('No users found');
				res.send('No users found');
			}
			else if(usersResult.length==0)
			{
				console.log('No users available');
				res.send('No users available');
			}
			else
			{
				var allUsers = [];
				for (var i = 0; i <= usersResult.length - 1; i++) {
					allUsers.push(new User(usersResult[i]));
				};
				res.send(allUsers);
			}
		});
	},

	findById : function(req, res) {
		var id = req.params.id;
		console.log('Retrieving a user..');
		User.findById(id, function(err, usersResult) {
			if(err || !usersResult)
			{
				console.log('No user found');
				res.send('No user found');
			}
			console.log(JSON.stringify(usersResult));
			res.send(usersResult);
		});
	},
	
	addUser : function(req, res) {
		var UsertoAdd = req.body;
		var newUser = new User(UsertoAdd);
		console.log('Adding user..' + JSON.stringify(newUser));
		newUser.save(function(err, saved) {
			if( err || !saved ) {
				console.log('User not saved');
				res.send(500);
			}
			else 
				console.log('User saved');
			res.json({"id": newUser._id});
		});
	},

	updateUser : function(req, res) {
		var id = req.params.id;
		var userToUpdate = req.body;
		console.log("User:" + JSON.stringify(userToUpdate));
		var updatedUser = new User(userToUpdate);
		console.log('Updating user..');
		User.findOne({_id: ObjectId(id)}, function (err, user) {
		  if (!user) {
		    user = new User();
		  }
		  for(var prop in userToUpdate)
	  		user[prop] = userToUpdate[prop];
	  	user.save(function(err, saved) {
				if( err || !saved ) {
					console.log('User not saved');
					res.send(500);
				}
				else 
					console.log('User saved');
				res.send(200);
			});
		});
	},

	deleteUser : function(req,res) {
		var id = req.params.id;
		console.log('Retrieving user..');
		User.findOne({_id: ObjectId(id)}, function (err, user) {
			if (!user) {
			  user = new User();
			}
			user.deleted = true;
		  user.save(function(err, saved) {
					if( err || !saved ) {
						console.log('User not saved');
						res.send(500);
					}
					else {
						console.log('User saved');
						res.send(200);
					}
				});
		 });
	}
}