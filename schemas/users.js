var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var users = new mongoose.Schema({
		username:String,
		email: String,
		family_name: String,
		gender: String,
		given_name: String,
		id: String,
		avatar: String
	});


users.virtual('name.full').get(function(){
	return this.given_name + ' ' + this.family_name;
});

module.exports = users;