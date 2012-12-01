(function($) {
	$.fn.countTo = function(options) {
		// merge the default plugin settings with the custom options
		options = $.extend({}, $.fn.countTo.defaults, options || {});
		
		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(options.speed / options.refreshInterval),
			increment = (options.to - options.from) / loops;
		
		return $(this).each(function() {
			var self = this,
				loopCount = 0,
				value = options.from,
				interval = setInterval(updateTimer, options.refreshInterval);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				var string_value = value.toFixed(options.decimals);
				if (options.commas) {
					string_value = string_value.replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
				}
				$(self).html(string_value);
				
				if (typeof(options.onUpdate) == 'function') {
					options.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					clearInterval(interval);
					value = options.to;
					
					if (typeof(options.onComplete) == 'function') {
						options.onComplete.call(self, value);
					}
				}
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,  // the number the element should start at
		to: 100,  // the number the element should end at
		speed: 1000,  // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,  // the number of decimal places to show
		commas: false, // if you want fancy formatting with commas
		onUpdate: null,  // callback method for every time the element is updated,
		onComplete: null  // callback method for when the element finishes updating
	};
}(jQuery));
