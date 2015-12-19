var express = require('express');
var router = express.Router();

//import models
var stock = require('../models/stocks');
var article = require('../models/articles');

/* GET article page. */
router.post('/stocks', function(request, response) {
	console.log('render stocks page');
	var userQuery = request.body;
	userQuery.userQueryInput = userQuery.userQueryInput.toUpperCase();
	console.log(userQuery.userQueryInput);
	console.log(userQuery.userQueryInput.charCodeAt(0));
	console.log((userQuery.userQueryInput.charCodeAt(0)>=48)&&(userQuery.userQueryInput.charCodeAt(0)<=57));
	
	if ((userQuery.userQueryInput.charCodeAt(0)>=48)&&(userQuery.userQueryInput.charCodeAt(0)<=57)){				//is id search
		
	
	//var userInput = localStorage.getItem("stockId");
	var stockQuery = stock.findOne({ id: userQuery.userQueryInput },"name id articles abbr",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	console.log('inside query');
	
	var articleQuery = article.find({stock_uid: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	if (result == null){
		
	response.render('pages/error',userQuery.userQueryInput);	
		
	}
	else
	{	
	var stockVariables = {
		name: result.name,
		id :result.id,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	}
	});
	
	
	});
	}
	else if ((userQuery.userQueryInput.charCodeAt(0)>=65)&&(userQuery.userQueryInput.charCodeAt(0)<=90)){		//is abbr search
		
	var stockQuery = stock.findOne({ abbr: userQuery.userQueryInput },"name id articles abbr",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	
	
	var articleQuery = article.find({stock_abbr: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	if (result == null){
		
	response.render('pages/error',userQuery.userQueryInput);	
		
	}
	
	else
	{		
	var stockVariables = {
		name: result.name,
		id :result.id,
		abbr : result.abbr,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	}
	});
	
	
	});
	}
	else{
		response.render('pages/error',userQuery.userQueryInput);	
	}
	
});


 
module.exports = router;
