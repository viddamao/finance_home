
var Stocks = require('./models/stocks');
var fs = require('fs');
//var counter = 0;

function readLines(input, add_stock) {
  var remaining = ''	//remaining input stream
  

  
  //process and splice stock input
    remaining += input;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
	  
	  add_stock(line);
	  
	  index = remaining.indexOf('\n');
	 
      
    }

    if (remaining.length > 0) {
      add_stock(remaining);
    }
 
}

function add_stock(data) {
	//counter++;
	var id = '';			//stock id
	var name = '';			//stock name
	var abbr = '';			//stock abbr
	var first_split = 0;	
	var second_split = 0;
  
	first_split = data.indexOf(';');
	second_split = data.substring(first_split+1).indexOf(';');
	var temp = data.substring(second_split+1);
	temp=temp.substring(temp.indexOf(';')+1);
	var split = temp.indexOf(';');	
	  
	id = data.substring(0,first_split);
	name = temp.substring(0,split);
	abbr = temp.substring(split+1);
	
	
	//console.log(id,'  ',str,'  ',abbr,'  ',name);
		
	var new_stock = new Stocks({
		"name" 	: name,
        "id" 	: id,
		"abbr"	: abbr	
	});  
	
	new_stock.save(function(err, new_stock) {
		if (err) return console.error(err);
		//console.dir(new_stock);
	});
}

function init_stocks(){


var iconv = require('iconv-lite'); 
var bin = fs.readFileSync('stockList_20151217.txt');

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

readLines(bin.toString('utf-8'),add_stock);
console.log('hello');


}
exports.init_stocks = init_stocks;