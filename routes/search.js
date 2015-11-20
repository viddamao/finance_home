var express = require('express');
var router = express.Router();

//import models
var stock = require('../models/stocks');
var article = require('../models/articles');

/* GET article page. */
router.post('/stocks', function(request, response) {
	console.log('render stocks page');
	var userQuery = request.body;
	console.log(userQuery);
	//var userInput = localStorage.getItem("stockId");
	var stockQuery = stock.findOne({ id: userQuery.userInputStockId },"name id articles",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	var articleQuery = article.find({stock_uid: userQuery.userInputStockId},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	
	var stockVariables = {
		name: result.name,
		id :result.id,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	});
	
	
	});
	
	
	
});


 
module.exports = router;
