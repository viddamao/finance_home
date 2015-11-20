var express = require('express');
var app = express();


//import mongoose module
var bae = require('./bae');
bae.getConnect();


//import models
var Stock = require('./models/stocks');
var Article = require('./models/articles');
var User = require('./models/users');	
	

	var vidda = new User({
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
	
	var google = new Stock({
        "name" : "Google",
        "id" : "600000",
        "high" : 618.76,
		"start" : 600.12,
		"articles":[]
});
	var coke = new Stock({
        "name" : "Cocacola",
        "id" : "600001",
        "high" : 15.23,
		"start": 12.33,
		"articles":[]
});
	
	

	var article1 = new Article({
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
	
	var article2 = new Article({
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
	
	var article3 = new Article({
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

	
	
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);	


	
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



