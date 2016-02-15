var express = require('express');
var router = express.Router();


/* GET article page. */
exports.index= function(req, res) {
	console.log('render articles page');
	res.render('./pages/articles', function(err, html) {
		res.send(html);
	});
};

module.exports = router;
