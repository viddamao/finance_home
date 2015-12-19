var mongoose = require('mongoose');
var stockSchema = require('../schemas/stocks');
var Stocks = mongoose.model('stocks', stockSchema);

var bulk = Stocks.collection.initializeBulkOrderedOp();
Stocks.collection.find({ "abbr": /^\s+|\s+$/ },{ "abbr": 1}).forEach(
    function(doc) {
        bulk.find({ "_id": doc._id }).update({
            "$set": { "abbr": doc.abbr.trim() }
        });

        
    }
);

module.exports = Stocks;