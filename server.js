var express = require('express');
var app = express();


//import mongoose module
var bae = require('./bae');
bae.getConnect();
bae.testRedis();

markdown = require('markdown').markdown;

//import models
var Stock = require('./models/stocks');
var Article = require('./models/articles');
var User = require('./models/users');	

//var init_stocks = require('./routes/init_stocks'); 
//init_stocks.init_stocks();

//var init_suggestions = require('./routes/init_suggestions');
//init_suggestions.init();

var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);	
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var settings = require('./settings');
	
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
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
app.use(flash());

var index = require('./routes/index');
var about = require('./routes/about');
var articles = require('./routes/articles');
var news = require('./routes/news');
var search = require('./routes/search');
//var login = require('./routes/login');
//var signup = require('./routes/signup');


app.use('/', index);
app.use('/', about);
app.use('/', news);
app.use('/', articles);
app.use('/', search);
//app.use('/', login);
//app.use('/', signup);




// catch 404 and forward to error handler
/*
app.use("*",function(req, res, next) {
	console.log("404");
	var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

// production error handler
// no stacktraces leaked to user


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
 // res.render('./pages/error');
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



