var express = require('express');
var app = express();

var db = require('monk')("mongodb://localhost:27017/finance_home");

var users = db.get("users");
var stocks = db.get("stocks");
var articles = db.get("articles");
//var comments = db.get("comments");
users.index('id', {
  unique: true
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
	response.render('pages/stocks');
});


app.listen(app.get('port'));
  
console.log('Node app is running on port', app.get('port'));

