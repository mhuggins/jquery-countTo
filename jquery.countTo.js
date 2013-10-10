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
				easing:          $(this).data('easing')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				changeInValue = settings.to - settings.from,
				increment = changeInValue / loops;
								
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
			
				loopCount++;

				value = ease(settings.easing, loopCount, settings.from, changeInValue, loops);
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
				$self.html(formattedValue);
			}

			// Easing functions
			var ease = function(type, currentIteration, startValue, changeInValue, totalIterations){

				switch(type){
					case 'linear':
						return changeInValue * currentIteration / totalIterations + startValue;
					break;

					case 'easeInQuad':
						return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
					break;

					case 'easeOutQuad':
						return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
					break;

					case 'easeInOutQuad':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * currentIteration * currentIteration + startValue;
					    }
					    return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
					break;

					case 'easeInCubic':
						return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
					break;	

					case 'easeOutCubic':
						return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
					break;	

					case 'easeInOutCubic':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
					    }
					    return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
					break;

					case 'easeInQuart':
						return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
					break;	

					case 'easeOutQuart':
						return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
					break;	

					case 'easeInOutQuart':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
					    }
					    return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
					break;	
					
					case 'easeInQuint':
						return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
					break;	

					case 'easeOutQuint':
						return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
					break;	

					case 'easeInOutQuint':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
					    }
					    return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
					break;	

					case 'easeInSine':
						return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
					break;

					case 'easeOutSine':
						return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
					break;

					case 'easeInOutSine':
						return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
					break;

					case 'easeInExpo':
						return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
					break;

					case 'easeOutExpo':
						return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
					break;

					case 'easeInOutExpo':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
					    }
					    return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
					break;

					case 'easeInCirc':
						return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
					break;

					case 'easeOutCirc':
						return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
					break;

					case 'easeInOutCirc':
						if ((currentIteration /= totalIterations / 2) < 1) {
					        return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
					    }
					    return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
					break;

					default: // Linear
						return changeInValue * currentIteration / totalIterations + startValue;
				}
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null,      // callback method for when the element finishes updating
		easing: 'linear'       // Which easing function to use
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));