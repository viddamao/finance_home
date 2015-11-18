var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  console.log("/"+req.method);
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
	console.log('render homepage');
	res.render('./pages/index');
});

module.exports = router;
