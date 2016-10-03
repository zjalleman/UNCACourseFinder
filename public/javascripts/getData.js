(function() {
	"use strict";
	
	var main = function() {
        console.log("hello");
		var url = 'http://www3.unca.edu/schedules/dev/schedules-json.php?term=201660&department=CSCI&callback=?';
		$.getJSON(url, function(sunResponse) {
            console.log("hello");
			console.log(sunResponse);
			var $sunTable = $('<table>');
			var response = sunResponse[0];
            console.log($sunTable);
			for (var prop in response) {
				var $item = $('<tr>');
				var $itemProp = $('<td>').text(prop);
				var $itemVal = $('<td>').text(response[prop]);
				$item.append($itemProp);
				$item.append($itemVal);
				$sunTable.append($item);	
			}
			
			$('main').append($sunTable);
		});
	};
	
	$(document).ready(main);
}());