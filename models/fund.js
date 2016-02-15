var mongoose = require('mongoose');
var fundSchema = require('./schemas/fund');
var fund = mongoose.model('fund', fundSchema);


module.exports = Fund;