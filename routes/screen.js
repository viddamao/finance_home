var express = require('express');
var router = express.Router();
var Fund = require('../models/fund.js')

/* GET screen page. */
router.get('/screen', function(req, res) {
	console.log('render screen page');
	Fund.find(function(err,funds){
      //查询到的所有person
    
        res.render('./pages/screen',{funds:funds}, function(err, html) {
		res.send(html);
	});
  });
});

module.exports = router;
