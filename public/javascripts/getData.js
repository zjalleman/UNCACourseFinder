(function() {
	"use strict";
	
	var main = function() {
		var url = 'http://www3.unca.edu/schedules/dev/schedules-json.php?term=201660&department=CSCI';
		$.getJSON(url, function(sunResponse) {
			console.log(sunResponse);
			var $sunTable = $('<table>');
			var response = JSON.parse(sunResponse);
            console.log(response);
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