
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?1647ea7c9459835637b3f278c81f4ae6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

$(function(){
	 $( "#size-slider" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 10000 ],
      slide: function( event, ui ) {
        $( "#size-val" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#size-val" ).val( "$" + $( "#size-slider" ).slider( "values", 0 ) +
      " - $" + $( "#size-slider" ).slider( "values", 1 ) );
	  
	 $( "#since-slider" ).slider({
      range: true,
      min: 0,
      max: 15,
      values: [ 0, 15 ],
      slide: function( event, ui ) {
        $( "#since-val" ).val(  ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#since-val" ).val( "$" + $( "#since-slider" ).slider( "values", 0 ) +
      " - $" + $( "#since-slider" ).slider( "values", 1 ) );
	  
	
});

var transTable = {"global","全球"};
transTable.set("mixed","混合");
