var express = require('express');
var app = express();

var mongoose = require('mongoose');
//var db = mongoose.connection;
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


var Stocks = require('./models/stocks');
var Articles = require('./models/articles');
var Users = require('./models/users');	
	

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var index = require('./routes/index');
//var about = require('./routes/about');
//var articles = require('./routes/articles');
//var news = require('./routes/news');
//var search = require('./routes/search');


app.use('/', index);
//app.use('/', about);
//app.use('/', news);
//app.use('/', articles);
//app.use('/', search);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error');
});


/* app.get('/', function(request, response) {
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

 */
/* app.post('/stocks/', function(request, response) {
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
 */

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



