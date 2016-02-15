var mongoose = require('mongoose');
var fundSchema = require('./schemas/fund.js');
var fund = mongoose.model('fund', fundSchema);


module.exports = Fund;