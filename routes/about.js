var express = require('express');
var router = express.Router();


/* GET about page. */
router.get('/about', function(req, res) {
	console.log('render about page');
	res.render('./pages/about');
});

module.exports = router;
