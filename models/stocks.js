var mongoose = require('mongoose');
var stockSchema = require('../schemas/stocks');
var Stocks = mongoose.model('stocks', stockSchema);


module.exports = Stocks;