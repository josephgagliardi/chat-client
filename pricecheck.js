(function() {
	//Use ES5 Strict Mode
	'use strict';
	//Helper accessor of cookie values
	var getCookie = function(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};
	//Perform price check
	var priceCheck = function(msg) {
		//First check for previous price limits
		var cookieValue = getCookie('UA_price_limit');
		var defaultLimit = cookieValue === undefined ? "100.00" : cookieValue;
		//Check if method has been envoked via callback
		if (msg === undefined) {
			var limit = prompt("What is your price limit?", "$" + defaultLimit);
		} else {
			var limit = prompt(msg, '$' + defaultLimit);
		}
		//Sanitize currency notation
		while (limit.charAt(0) === '$') {
			limit = limit.substr(1);
		}
		//So long as input value is legitimate numeric input hide non-qualifying products
		if (limit !== null && !isNaN(parseFloat(limit)) && isFinite(limit)) {
			var price = Number(limit.replace(/[^0-9\.]+/g, ""));
			$('.tile').each(function() {
				if (Number($(this).find('.price span').html().replace(/[^0-9\.]+/g, "")) > price) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});
			//Display process complete message to user
			console.log("Items over $" + price + " have been hidden. Enjoy shopping!");
			//Set cookie with new price limit value
			document.cookie = "UA_price_limit=" + price;
		} else {
			//Give user opportunity to enter legitimate input if there is an error
			priceCheck('Oops. Try entering a monetary value in USD i.e. $100, $100.00, 100.00, or $8000000 (if you\'ve got it like that)');
		}
	};
	priceCheck();
})(console.log("Checking Prices..."));