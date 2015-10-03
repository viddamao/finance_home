var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	console.log('render homepage');
	response.render('pages/index');
});

app.get('/index', function(request, response) {
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


app.listen(8080);
  
console.log('Node app is running on port', app.get('port'));

