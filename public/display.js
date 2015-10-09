var user;

$.post("/stocks/", { data : { "stockId" : stockId } }, function(callback) {
		
});


function navigateToStockById()	{
	
	


	var stockId = document.getElementById("userInputStockId").value;
	console.log("getting stock "+stockId);
	localStorage.setItem("stockId",stockId);

	window.location.assign("/stocks");
}
