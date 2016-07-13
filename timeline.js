// slide the 5-year categories left or right to the indicated target date
function slideToTarget(num) {
	// num possible values:
		// 1, 6, 10, 14, 18, 19
	var target = parseInt(num);
	switch(target) {
		case 1:
			jQuery('#decade-slider').animate({
				"left": "0",
			});
			break;
		case 6:
			jQuery('#decade-slider').animate({
				"left": "-1555px",
			});
			break;
		case 10:
			jQuery('#decade-slider').animate({
				"left": "-2799px",
			});
			break;
		case 14:
			jQuery('#decade-slider').animate({
				"left": "-4043px",
			});
			break;
		case 18:
			jQuery('#decade-slider').animate({
				"left": "-5287px",
			});
			break;
		case 19:
			jQuery('#decade-slider').animate({
				"left": "-5909px",
			});
			break;
		default:
			jQuery('#decade-slider').animate({
				"left": "0",
			});
	}
}

// slide the 5-year categories left or right as indicated by direction (dir)
function slideYears(dir) {
	// the width of each segment
	var segWidth = 311;
	// the current position
	var curPos = jQuery('#decade-slider').position().left;
	// total number of segments
	var totalDecs = jQuery('#decade-slider li.year:last-child').attr('data-num');
	// the furthest to the right we should be able to go.
	var maxRight = totalDecs * 311;
	// convert to negative
	maxRight = maxRight - maxRight - maxRight;

	// if we are moving left
	if(dir == 'left') {
		// if we are as far left as we can go
		if(curPos < 0) {
			jQuery('#decade-slider').animate({
				"left": "+=311px",
			});
		} else {
			// do nothing
		}
	// if we are moving right
	} else {
		// if we are as far right as we can go
		if(curPos <= -5909) {
			// do nothing.
		} else {
			jQuery('#decade-slider').animate({
				"left": "-=311px",
			});
		}
	}
}

// move the main slider directly to an item.
function slideMainTo(num) {
	// the slide we want active
	var targetSlide = jQuery('#main-slide li[data-num="'+num+'"]');

	// hide whatever is active.
	jQuery('#main-slide li.active').removeClass('active');

	// make our new slide active.
	targetSlide.addClass('active');

}


// move through the main slider in the direction (dir) indicated ('left' or 'right')
function slideMain(dir) {
	var slideNum = jQuery('#main-slide li.active').attr('data-num');
	var slideTotal = jQuery('#main-slide li:last-child').attr('data-num');
	var slideTargetNum;
	if(dir == 'right') {
		// just increase the slide by one
		slideNum++;
		// if we're at the end, reset the target
		if(slideNum > slideTotal) {
			slideTargetNum = 1;
		} else {
			// otherwise the target becomes equal to the slideNum (the slide increased by one)
			slideTargetNum = slideNum;
		}
	} else {
		// just decrease the slide by one
		slideNum--;
		if(slideNum < 1) {
			// if we're at the starg, move to the end
			slideTargetNum = slideTotal;
		} else {
			// otherwise the target becomes equal to the slideNum (the slide decreased by one)
			slideTargetNum = slideNum;
		}
	}
	jQuery('#main-slide li.active').removeClass('active');
	jQuery('#main-slide li[data-num='+slideTargetNum+']').addClass('active');
}




jQuery(document).ready(function() {
	// click event on the main slider control
	jQuery('#main-slide-controls .control').click(function() {
		var direction = 'left';
		if(jQuery(this).hasClass('right')) {
			direction = 'right';
		}

		slideMain(direction);
	});

	// click event on the years control
	jQuery('#year-slide-controls .control').click(function() {
		var direction = 'left';
		if(jQuery(this).hasClass('right')) {
			direction = 'right';
		}

		slideYears(direction);
	});

	// click event in the sliding timeline area to move the main info area.
	jQuery('.year-specific-item').click(function() {
		var targetSlide = jQuery(this).attr('target');

		slideMainTo(targetSlide);
	});

	// click event for the "quick-year-tabs" time periods toggle
	jQuery('#quick-year-tabs li').click(function() {
		// switch what's active
		jQuery('#quick-year-tabs li.active').removeClass('active');
		jQuery(this).addClass('active');

		// call function to move to the start of the indicated time period.
		var targetPeriod = jQuery(this).attr('target');
		slideToTarget(targetPeriod);
	});
});