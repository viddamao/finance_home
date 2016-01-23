var mongoose = require('mongoose');
var articleSchema = require('../schemas/articles');
var articles = mongoose.model('articles', articleSchema);


module.exports = Articles;