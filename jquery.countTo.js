(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals'),
				prefix:          $(this).data('prefix'),
				suffix:          $(this).data('suffix'),
				withCommas:      $(this).data('with-commas'),
				ordinal:         $(this).data('ordinal')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.text(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,                         // the number the element should start at
		to: 0,                           // the number the element should end at
		speed: 1000,                     // how long it should take to count between the target numbers
		refreshInterval: 100,            // how often the element should be updated
		decimals: 0,                     // the number of decimal places to show
		prefix: '',                      // the prefix to appear before the number
		suffix: '',                      // the suffix to appear after the number (and ordinal, if set)
		withCommas: false,               // whether the number should show thousand/million commas
		ordinal: false,                  // whether it should show 1st, 2nd, 3rd and so on
		ordinalHandler: ordinalHandler,  // handler for formatting the ordinals
		formatter: formatter,            // handler for formatting the value before rendering
		onUpdate: null,                  // callback method for every time the element is updated
		onComplete: null                 // callback method for when the element finishes updating
	};

	function ordinalHandler(settings) {
		if(settings.ordinal !== false) {
			var s = ["th","st","nd","rd"],
			v = settings.to % 100;
			return s[(v-20)%10]||s[v]||s[0];
		}
		return '';
	}

	function numberWithCommas(value, settings) {
		if(settings.withCommas !== false) {
			var parts = value.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
		return value;
	}

	function formatter(value, settings) {
		return settings.prefix + numberWithCommas( value.toFixed(settings.decimals), settings ) + settings.suffix + settings.ordinalHandler.call(self, settings);
	}

}(jQuery));