var mongoose = require('mongoose');
var fundSchema = require('../schemas/funds');
var funds = mongoose.model('funds', fundSchema);


module.exports = Funds;