var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');
var ObjectId = mongoose.Schema.Types.ObjectId;

var stocks = new mongoose.Schema({
        name:String,
        id:String,
		abbr:String,
		articles:[ObjectId]	
	});

module.exports = stocks;











