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

