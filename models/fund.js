var mongoose = require('mongoose');
var fundSchema = require('../schemas/fund');
var Fund = mongoose.model('fund', fundSchema);


module.exports = Fund;