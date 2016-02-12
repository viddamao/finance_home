var express = require('express');
var router = express.Router();

/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  console.log("/"+req.method);
  next();
});
*/


/* GET home page. */
router.get('/', function(req, res) {
	res.render('./pages/index', function(err, html) {
		res.send(html);
	});
});

router.get('/public/background.jpg', function(req, res) {
	res.send('../public/background.jpg');
});

module.exports = router;
