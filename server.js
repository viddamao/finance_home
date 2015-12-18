var express = require('express');
var app = express();


//import mongoose module
var bae = require('./bae');
bae.getConnect();

markdown = require('markdown').markdown;

//import models
var Stock = require('./models/stocks');
var Article = require('./models/articles');
var User = require('./models/users');	

var fs = require('fs');

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
	var id = '';			//stock id
	var name = '';			//stock name
	var abbr = '';			//stock abbr
	var first_split = 0;	
	var second_split = 0;
  
	first_split = data.indexOf(';');
	second_split = data.substring(first_split+1).indexOf(';');
	  
	id = data.substring(0,first_split)
	name = data.substring(first_split+1,second_split);
	abbr = data.substring(second_split+1);
	
	
	var buf = new Buffer(name,'binary');
    var str = iconv.decode(buf,'utf-8');
	
	//console.log(id,'  ',str,'  ',abbr,'  ',name);
		
	var new_stock = new Stock({
		"name" 	: name,
        "id" 	: id,
		"abbr"	: abbr	
	});  
	
	new_stock.save(function(err, new_stock) {
		if (err) return console.error(err);
		//console.dir(new_stock);
	});
}


if (stock_init==false){
Stock.remove({}, function(err) { 
   console.log('collection removed') 
});

var iconv = require('iconv-lite'); 
var bin = fs.readFileSync('stockList_20151217.txt');

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }

readLines(bin.toString('utf-8'),add_stock);
stock_init=true; 
}
console.log("hello1");
 
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);	
var favicon = require('serve-favicon');
	
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'lalalalala',
  resave:false,
  saveUninitialized:false, 
  cookie: { maxAge: 3600000 },
  store:new MongoStore({
            mongooseConnection: bae.mongoose.connection 
            })
}));

app.use(function(req, res, next){
  if(req.session.loggedIn){
        res.locals.authenticated = true;
        User.findById(req.session.loggedIn, function(err, doc){
            if(err) return next(err);
            res.locals.me = doc;
            next();
        });
  } else {
        res.locals.authenticated = false;
        next();
  }
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var index = require('./routes/index');
var about = require('./routes/about');
var articles = require('./routes/articles');
var news = require('./routes/news');
var search = require('./routes/search');


app.use('/', index);
app.use('/', about);
app.use('/', news);
app.use('/', articles);
app.use('/', search);


// catch 404 and forward to error handler
app.use("*",function(req, res, next) {
	console.log("404");
	var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('./pages/error');
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
http.globalAgent.maxSockets = 10;

/**
 * Get port from environment and store in Express.
 */

var port = 18080;
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



