	var fund1 = new fund({
        "name" : "fund1",
        "id" : "0001",
		"founder":"Max"
});
	var fund2 = new fund({
        "name" : "fund2",
        "id" : "0002",
		"founder": "Wang"
});
	

	
	fund1.save(function(err, fund1) {
		if (err) return console.error(err);
		//console.dir(fund1);
	});
	
	fund2.save(function(err, fund2) {
		if (err) return console.error(err);
		//console.dir(fund2);
	});

