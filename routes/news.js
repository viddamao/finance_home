var express = require('express');
var router = express.Router();


/* GET news page. */
router.get('/news', function(req, res) {
	console.log('render news page');
	res.render('./pages/news', function(err, html) {
		res.send(html);
	});
});

module.exports = router;
