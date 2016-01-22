
var Funds = require('./models/fund');
var fs = require('fs');
//var counter = 0;

function readLines(input, add_fund) {
  var remaining = ''	//remaining input stream
  

  
  //process and splice stock input
    remaining += input;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
	  
	  add_fund(line);
	  
	  index = remaining.indexOf('\n');
	 
      
    }

    if (remaining.length > 0) {
      add_fund(remaining);
    }
 
}

function add_fund(data) {
	//counter++;
	var id = '';
	var id_int = 0;			//fund id
	var name = '';			//fund name
	var founder = '';		//founder name
	var first_split = 0;	
	var second_split = 0;
  
	first_split = data.indexOf(';');
	second_split = data.substring(first_split+1).indexOf(';');
	var temp = data.substring(second_split+1);
	temp=temp.substring(temp.indexOf(';')+1);
	var split = temp.indexOf(';');	
	  
	id = data.substring(0,first_split);
	name = temp.substring(0,split);
	founder = temp.substring(split+1).trim();
	
	
	//console.log(id,'  ',str,'  ',founder,'  ',name);
	var fundQuery = funds.findOne({ id: id},function (err, result){
		
	
	if (err){
		console.log('err');
	}
	
	if (result==null)
	{	
	var new_fund = new Funds({
		"name" 	: name,
        "id" 	: id,
		"id_int": id_int,
		"founder":founder
	});  
	
	new_fund.save(function(err, new_fund) {
		if (err) return console.error(err);
		//console.dir(new_fund);
	});
	}
	});
}

function init_funds(){


var iconv = require('iconv-lite'); 
var bin = fs.readFileSync('fundList.txt');

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

readLines(bin.toString('utf-8'),add_fund);
console.log('hello');


}
exports.init_funds = init_funds;