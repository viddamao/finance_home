var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fund = new mongoose.Schema({
        name:String,
        id:Number,
		founder:String,
		size:Number,
		since:Number,
		rtr:[Number],
		one_qtr:Number,
		one_yr:Number,
		three_yr:Number,
		annual_rtr:Number,
		total_rtr:Number,
		strategy:String,
		type:String,
		region:String,
		field:String,
		summary:String,
		pm_summary:String
			
	});

module.exports = fund;











