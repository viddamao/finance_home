var express = require('express');
var router = express.Router();


/* GET screen page. */
router.get('/screen', function(req, res) {
	console.log('render screen page');
	res.render('./pages/screen', function(err, html) {
		res.send(html);
	});
});

module.exports = router;
