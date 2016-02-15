
var Fund = require('../models/fund');
var fs = require('fs');

function readLines(input, add_fund) {
  var remaining = "";		//remaining input stream
  
  //process and split stock input to lines
    remaining += input;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
	  add_fund(line);
	  index = remaining.indexOf('\n');
      
    }

    //process last fund
    if (remaining.length > 0) {
      add_fund(remaining);
    }
 
}

/*
 *take one line of fund data, splice and write to DB
 */
function add_fund(data) {
	//counter++;
	var id = "";			//fund id
	var name = "";			//fund name
	var founder ="";
	var size=0;				//fund size
	var since = 0;			//found date
	var strategy ="";		//fund strategy
	var type="";			//fund type
	var region="";			//fund region
	var field="";			//fund invest field
	var dataArr=new Array();
	var split_point = 0;	
  	
  	while (data.indexOf(';')!=-1){

  		//splice data to array
		split_point = data.indexOf(';');
		dataArr.push(data.substring(0,split_point));
		data=data.substring(split_point+1);
		
  	}

	console.log(dataArr);
	dataArr.reverse();
	
	id       = dataArr.pop();
	name     = dataArr.pop();
	size     = parseFloat(dataArr.pop());
	since    = parseInt(dataArr.pop());
	strategy = dataArr.pop();
	type 	 = dataArr.pop();
	region   = dataArr.pop();
	field    = dataArr.pop();
	

	var fundQuery = Fund.findOne({ id: id},function (err, result){
		
	
	if (err){
		console.log('err');
	}
	
	if (result==null)
	{	
	var new_fund = new Fund({
		"name" 	  : name,
        "id" 	  : id,
		"founder" : founder,
		"since"   : since,
		"size"    : size,
		"field"   : field,
		"region"  : region,
		"type" 	  : type,
		"strategy":	strategy	

	});  
	
	new_fund.save(function(err, new_fund) {
		if (err) return console.error(err);
		//console.dir(new_fund);
	});
	}
	});
	
}

function init_funds(){


var iconv = require("iconv-lite"); 
var bin = fs.readFileSync("./public/fundList.txt","utf-8");
//splice file head
 if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
     bin = bin.slice(3);
 }

readLines(bin.toString('utf-8'),add_fund);
console.log('hello');


}
exports.init_funds = init_funds;