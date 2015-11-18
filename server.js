var express = require('express');
var app = express();

var mongoose = require('mongoose');
var db = mongoose.connection;
var ObjectId = mongoose.Schema.Types.ObjectId;

var uristring = 'mongodb://mongo.duapp.com:8908/VhpiFanakhuHdTjVHxMd';
var user = '9100bd6357d945a9ac962a65957c2a53';
var pas = 'e4e1e426f9154811be0e75e76efe343c';

mongoose.connect( uristring ,{user:user,pass:pas}, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to:  ' + err);
  } else {
    console.log ('Connection success');
  }
});	

/*
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});	
*/
	
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
		author_name: String,
		author_id:ObjectId,
		stock_uid:String,
		stock_id:ObjectId,
		stock_name:String,
		title: String,
		href:String,
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
		//console.dir(vidda);
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
	
	
	
	article.remove({}, function(err) {
	if (err) {
		console.log ('error deleting old data.');
	}
	});
	
	var article1 = new article({
	"author_name": "Vidda",
	"author_id":vidda._id,
	"stock_uid": "600000",
	"stock_id":google._id,	
	"stock_name": "Google",
    "title": "标题啦啦啦啦啦啦",
	"href":"www.google.com",
	"content":"askdnjsansjknandoabfdojbcjzbcs",
    "date": new Date("Sat Nov 28 2014 00:00:00 GMT+0000 (UTC)"),
	"likes" :10
	});
	
	var article2 = new article({
	"author_name": "Vidda",
	"author_id":vidda._id,
	"stock_uid": "600000",
	"stock_id":google._id,
	"stock_name": "google",
    "title": "lalala",
	"href":"www.facebook.com",
	"content":"blablabla",
    "date": new Date("Thu Oct 8 2015 00:01:00 GMT+0000 (UTC)"),
	"likes" :76
	});
	
	var article3 = new article({
	"author_name": "Vidda",
	"author_id":vidda._id,
	"stock_uid": "600001",
	"stock_id":coke._id,
	"stock_name": "coke",
    "title": "搞个大新闻",
	"href":"www.facebook.com",
	"content":"blablabla",
    "date": new Date("Sat Oct 10 2015 00:01:00 GMT+0000 (UTC)"),
	"likes" :11
	});
	
	article1.save(function(err, article1) {
		if (err) return console.error(err);
		//console.dir(article1);
	});
	
	article2.save(function(err, article2) {
		if (err) return console.error(err);
		//console.dir(article2);
	});
	
	article3.save(function(err, article3) {
		if (err) return console.error(err);
		//console.dir(article3);
	});
	
	
	google.articles.push(article1._id);
	google.articles.push(article2._id);
	coke.articles.push(article3._id);
	
	
	google.save(function(err, google) {
		if (err) return console.error(err);
		//console.dir(google);
	});
	
	coke.save(function(err, coke) {
		if (err) return console.error(err);
		//console.dir(coke);
	});



/**
 * Normalize a port into a number, string, or false.
 */

/*
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
	
var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

app.listen(app.get('port'));
  
console.log('Node app is running on port', app.get('port'));

*/


app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));


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


app.post('/stocks/', function(request, response) {
	console.log('render stocks page');
	var userQuery = request.body;
	//console.log(userQuery);
	//var userInput = localStorage.getItem("stockId");
	var stockQuery = stock.findOne({ id: userQuery.userInputStockId },"name id start high articles",function (err, result) {
	if (err) // handle this
		console.log("can't find stock in database");
	
	var articleQuery = article.find({stock_uid: userQuery.userInputStockId},"author_name title href date likes",function (err, articleResult) {
	if (err) // handle this
		console.log("can't find article in database");
	
	
	var stockVariables = {
		name: result.name,
		id :result.id,
		high: result.high,
		start:result.start,
		articles:articleResult
	};
	
	response.render('pages/stocks',stockVariables);	
	
	});
	
	
	});
	
	
	
});

app.get('/articles', function(request, response) {
	console.log('render articles page');
	response.render('pages/articles');
});


/*
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

*/

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '18080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}



