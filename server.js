var express = require('express');
var app = express();


//import mongoose module
var bae = require('./bae');
bae.getConnect();
//bae.testRedis();

//markdown = require('markdown').markdown;

//import models


var init_funds = require('./routes/init_funds'); 
//init_funds.init_funds();
//init_funds.init_fundRtr();


var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
//var flash = require('connect-flash');
var settings = require('./settings');
	
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.urlencoded({ extended: false }));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(flash());


var index = require('./routes/index');
var about = require('./routes/about');
var screen = require('./routes/screen');
var articles = require('./routes/articles');




app.get('/', index);
app.get('/about', about);
app.get('/screen', screen);
app.get('/articles', articles);




// production error handler
// no stacktraces leaked to user

/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('./pages/error');
});
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



