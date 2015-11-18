var express = require('express');
var router = express.Router();


/* GET about page. */
router.get('/about', function(req, res) {
	console.log('render about page');
	res.send('./pages/about');
});

module.exports = router;
