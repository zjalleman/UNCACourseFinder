(function() {
	"use strict";
	
	var main = function() {
		//var url = 'http://www3.unca.edu/schedules/dev/schedules-json.php?term=201660&department=CSCI&callback=?';
        var url = "/javascripts/classData.js";
		$.getJSON(url, function(schedResponse) {
            var obj = schedResponse;
		});
        
	};
	$(document).ready(main);
    //console.log(main);
}());