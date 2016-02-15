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

<tbody>
			<tr><td>TYRUS CAPITAL S.A.M.</td><td>Bob</td><td>123</td><td>5</td><td>75</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TWIN CAPITAL MANAGEMENT INC</td><td>Mike</td><td>1214</td><td>10</td><td>100</td><td>90</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>MATRIX CAPITAL MANAGEMENT</td><td>Max</td><td>85</td><td>3</td><td>80</td><td>85</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>SANDLER O'NEILL ASSET MGMT LLC</td><td>David</td><td>234</td><td>7</td><td>100</td><td>100</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>ETON PARK CAPITAL MANAGEMENT</td><td>Rob</td><td>12456</td><td>6</td><td>95</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TYRUS CAPITAL S.A.M.</td><td>Bob</td><td>123</td><td>5</td><td>75</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TWIN CAPITAL MANAGEMENT INC</td><td>Mike</td><td>1214</td><td>10</td><td>100</td><td>90</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>MATRIX CAPITAL MANAGEMENT</td><td>Max</td><td>85</td><td>3</td><td>80</td><td>85</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>SANDLER O'NEILL ASSET MGMT LLC</td><td>David</td><td>234</td><td>7</td><td>100</td><td>100</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>ETON PARK CAPITAL MANAGEMENT</td><td>Rob</td><td>12456</td><td>6</td><td>95</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TYRUS CAPITAL S.A.M.</td><td>Bob</td><td>123</td><td>5</td><td>75</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TWIN CAPITAL MANAGEMENT INC</td><td>Mike</td><td>1214</td><td>10</td><td>100</td><td>90</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>MATRIX CAPITAL MANAGEMENT</td><td>Max</td><td>85</td><td>3</td><td>80</td><td>85</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>SANDLER O'NEILL ASSET MGMT LLC</td><td>David</td><td>234</td><td>7</td><td>100</td><td>100</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>ETON PARK CAPITAL MANAGEMENT</td><td>Rob</td><td>12456</td><td>6</td><td>95</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TYRUS CAPITAL S.A.M.</td><td>Bob</td><td>123</td><td>5</td><td>75</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TWIN CAPITAL MANAGEMENT INC</td><td>Mike</td><td>1214</td><td>10</td><td>100</td><td>90</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>MATRIX CAPITAL MANAGEMENT</td><td>Max</td><td>85</td><td>3</td><td>80</td><td>85</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>SANDLER O'NEILL ASSET MGMT LLC</td><td>David</td><td>234</td><td>7</td><td>100</td><td>100</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>ETON PARK CAPITAL MANAGEMENT</td><td>Rob</td><td>12456</td><td>6</td><td>95</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TYRUS CAPITAL S.A.M.</td><td>Bob</td><td>123</td><td>5</td><td>75</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>TWIN CAPITAL MANAGEMENT INC</td><td>Mike</td><td>1214</td><td>10</td><td>100</td><td>90</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>MATRIX CAPITAL MANAGEMENT</td><td>Max</td><td>85</td><td>3</td><td>80</td><td>85</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>SANDLER O'NEILL ASSET MGMT LLC</td><td>David</td><td>234</td><td>7</td><td>100</td><td>100</td><td>80</td><td>80</td><td>80</td></tr>
			<tr><td>ETON PARK CAPITAL MANAGEMENT</td><td>Rob</td><td>12456</td><td>6</td><td>95</td><td>80</td><td>80</td><td>80</td><td>80</td></tr>
		</tbody>

		 <% results.forEach(function(r) { %>
        		<td><%= r.id %> - <%= r.name %></td>
    		<% }); %>

    		  	<% console.log(transTable.get("mixed")); %>
   				<td><% transTable.get("mixed"); %></td> 