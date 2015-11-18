var mongoose = require('mongoose');
var articleSchema = require('../schemas/articles');
var Articles = mongoose.model('articles', articleSchema);

module.exports = Articles;