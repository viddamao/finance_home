var express = require('express');
var app = express();

var mongoose = require('mongoose');
var db = mongoose.connection;
var ObjectId = mongoose.Schema.Types.ObjectId;

var uristring = "mongodb://localhost:27017/finance_home";
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});	

	
	var userSchema = new mongoose.Schema({
		username:String,
		email: String,
		family_name: String,
		gender: String,
		given_name: String,
		id: String
	});
	
	var stocksSchema = new mongoose.Schema({
        name : String,
        id : String,
        high : Number,
		start: Number,
		articles:[ObjectId]	
	});
	
	var articleSchema = new mongoose.Schema({
		author_id: ObjectId,
		title: String,
		content:String,
		date: Date,
		likes : Number
		
	});
	
	var user = mongoose.model("user",userSchema);
	var stock = mongoose.model("stock",stocksSchema);
	var article = mongoose.model("article",articleSchema);
	
	user.remove({}, function(err) {
	if (err) {
		console.log ('error deleting old data.');
	}
	});
	
	stock.remove({}, function(err) {
	if (err) {
		console.log ('error deleting old data.');
	}
	});
	
	
	var vidda = new user({
		email: "viddamao@gmail.com",
		family_name: "Mao",
		gender: "male",
		given_name: "Wenjun",
		id: "0000000001",
		username: "Vidda"
	});
	
	vidda.save(function(err, vidda) {
		if (err) return console.error(err);
		console.dir(vidda);
	});
	
	var google = new stock({
        "name" : "Google",
        "id" : "600000",
        "high" : 618.76,
		"start" : 600.12,
		"articles":[]
});
	var coke = new stock({
        "name" : "Cocacola",
        "id" : "600001",
        "high" : 15.23,
		"start": 12.33,
		"articles":[]
});
	google.save(function(err, google) {
		if (err) return console.error(err);
		console.dir(google);
	});
	
	coke.save(function(err, coke) {
		if (err) return console.error(err);
		console.dir(coke);
	});
	


app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//get user
app.get('/api/user', function(req, res) {
  res.json(req.user);
});


app.get('/', function(request, response) {
	console.log('render homepage');
	response.render('pages/index');
});

app.get('/about', function(request, response) {
	console.log('render about page');
	response.render('pages/about');
});


app.get('/news', function(request, response) {
	console.log('render news page');
	response.render('pages/news');
});

app.get('/stocks', function(request, response) {
	console.log('render stocks page');
	//var userInput = localStorage.getItem("stockId");
	var stockQuery = stock.findOne({ id: "600000" },"name start high",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");

	var stockVariables = {
		name: result.name,
		high: result.high,
		start:result.start
	}
	
	response.render('pages/stocks',stockVariables);	
	});
	
	
	
});

var http = require('http');

function getStockData(callback) {

    return http.get({
        host: 'http://hq.sinajs.cn',
        path: '/list=sh600000'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
			console.log(body);
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback({
                email: parsed.email,
                password: parsed.pass
            });
        });
    });

}


app.listen(app.get('port'));
  
console.log('Node app is running on port', app.get('port'));

