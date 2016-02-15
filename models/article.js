var mongoose = require('mongoose');
var articleSchema = require('../schemas/articles');
var article = mongoose.model('article', articleSchema);


module.exports = Article;