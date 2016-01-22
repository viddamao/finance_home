var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articles = new mongoose.Schema({
        name:String,
        id:String,
		publish_time:Date,
		author:String,
		time_read:Number,
		content:String	
		
	});

module.exports = articles;











