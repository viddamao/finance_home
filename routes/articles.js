var express = require('express');
var router = express.Router();


/* GET article page. */
router.get('/articles', function(req, res) {
	console.log('render articles page');
	res.render('./public/show_enai/index', function(err, html) {
		res.send(html);
	});
});

module.exports = router;
