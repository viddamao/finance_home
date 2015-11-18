var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {
	console.log('render homepage');
	res.render('pages/index');
});

module.exports = router;
