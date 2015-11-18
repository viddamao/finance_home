var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');
var Stocks = require('../models/stocks');
var ObjectId = Schema.Types.ObjectId;

var articles = new mongoose.Schema({
		author_name: String,
		author_id:{type:ObjectId, ref: 'user'},
		stock_uid:String,
		stock_id:{type:ObjectId, ref: 'stocks'},
		stock_name:String,
		title: String,
		href:String,
		content:String,
		date: Date,
		likes : Number
		
	});

module.exports = articles;











