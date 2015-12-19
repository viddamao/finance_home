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
		
	var stockQuery = stock.findOne({ id: userQuery.userQueryInput },"name id abbr",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	var articleQuery = article.find({stock_uid: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
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
	else if ((userQuery.userQueryInput.charCodeAt(0)>=65)&&(userQuery.userQueryInput.charCodeAt(0)<=90)){		//is abbr search
	//console.log(userQuery.userQueryInput);	
	var stockQuery = stock.where('abbr').equals(userQuery.userQueryInput).select("name id abbr").exec(function (err, result) {
	if (err) // handle this
	{	
		console.log("can't find stock in database");
	}
	
	var articleQuery = article.find({stock_abbr: userQuery.userQueryInput},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
	{
		console.log("can't find article in database");
	}
	
	if (result == null){
		
	response.render('pages/error',userQuery.userQueryInput);	
		
	}
	
	console.log(result.name);
	console.log(result.id);
	
	
	var stockVariables = {
		name: result.name,
		id :result.id,
		abbr : userQuery.userQueryInput,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	 });
	});
	}
	else{
		response.render('pages/error',userQuery.userQueryInput);	
	}
	
});


 
module.exports = router;
