var express = require('express');
var router = express.Router();

//import models
var stock = require('../models/stocks');
var article = require('../models/articles');

/* GET article page. */
router.post('/stocks', function(request, response) {
	console.log('render stocks page');
	var userQuery = request.body.toUpperCase();
	console.log(userQuery);
	
	if ((userQuery.charCodeAt(0)>=48)&(userQuery.charCodeAt(0)<=57)){				//is id search
		
	
	//var userInput = localStorage.getItem("stockId");
	var stockQuery = stock.findOne({ id: userQuery.userInputStockId },"name id articles abbr",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	
	
	var articleQuery = article.find({stock_uid: userQuery.userInputStockId},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	if (result == null){
		
	response.render('pages/error',userQuery);	
		
	}
		
	var stockVariables = {
		name: result.name,
		id :result.id,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	});
	
	
	});
	}
	else if ((userQuery.charCodeAt(0)>=65)&(userQuery.charCodeAt(0)<=90)){		//is abbr search
		
	var stockQuery = stock.findOne({ abbr: userQuery.userInputStockId },"name id articles abbr",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	
	
	var articleQuery = article.find({stock_abbr: userQuery.userInputStockId},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	if (result == null){
		
	response.render('pages/error',userQuery);	
		
	}
		
	var stockVariables = {
		name: result.name,
		id :result.id,
		abbr : result.abbr,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	});
	
	
	});
	}
	else{
		response.render('pages/error',userQuery);	
	}
	
});


 
module.exports = router;
