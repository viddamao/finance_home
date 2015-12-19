var express = require('express');
var router = express.Router();
var async = require('async');

//import models
var stock = require('../models/stocks');
var article = require('../models/articles');

/* GET article page. */
router.post('/stocks', function(request, response) {
	console.log('render stocks page');
	var userQuery = request.body;
	userQuery.userQueryInput = userQuery.userQueryInput.toUpperCase();
	
	if ((userQuery.userQueryInput.charCodeAt(0)>=48)&&(userQuery.userQueryInput.charCodeAt(0)<=57)){				//is id search
		
	
	//var userInput = localStorage.getItem("stockId");
	async.parallel([
	function(callback){
	var stockQuery = stock.findOne({ id: userQuery.userQueryInput },"name id abbr",function (err, result) {
	if (err) // handle this
	{
		console.log("can't find stock in database");
	}
	
	console.log('lalala');
	console.log(result.name);
	callback(null,result);
	console.log('inside query');
	});
	
	
	}
/*	,
	function(callback){
	var articleQuery = article.find({stock_uid: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
	{	
		console.log("can't find article in database");
	}	
	});
	
	callback(null,articleResult);
	}
*/	
	],
	function (err,results){
	console.log('inside callback');
		
	if (err){
		console.log('query err');
	}	
	
	
	var result = results[0];
//	var articleResult = results[1];
	console.log(result.name);
	
	if (result == null){
	console.log('result is null');	
	response.render('pages/error',userQuery.userQueryInput);	
		
	}
	
	var stockVariables = {
		name: result.name,
		id :result.id,
		abbr : result.abbr,
		articles:articleResult
	};
	console.log('outside query');
	response.render('pages/stocks',stockVariables);	
	
	}
	
	);
	}
	else if ((userQuery.userQueryInput.charCodeAt(0)>=65)&&(userQuery.userQueryInput.charCodeAt(0)<=90)){		//is abbr search
		
	var stockQuery = stock.findOne({ abbr: userQuery.userQueryInput },"name id articles abbr",function (err, result) {
	if (err) // handle this
	{	
		console.log("can't find stock in database");
	}
	});
	
	var articleQuery = article.find({stock_abbr: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
	{
		console.log("can't find article in database");
	}
	});
	if (result == null){
		
	response.render('pages/error',userQuery.userQueryInput);	
		
	}
	
	
	var stockVariables = {
		name: result.name,
		id :result.id,
		abbr : result.abbr,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	}
	else{
		response.render('pages/error',userQuery.userQueryInput);	
	}
	
});


 
module.exports = router;
