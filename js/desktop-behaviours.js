/* This file now combines desktop-only.js and tab-controller.js into a single desktop behaviours file */
(function($) {

$(function() {

/* assign various parts of the DOM to variables to cache them and reduce script execution time */
$window = $(window);
var $docBody = $('body');

/* calculate how far from the top of the page each navigation bar is */
if ($('#top-nav').length) { var TNdistance = $('#top-nav').offset().top; }
var courseNavExists = false;
if ($('#section-nav').length) { 
	$('#section-menu').find('li a').last().addClass('sys_last');
}
if ($('#course-nav').length) { 
	courseNavExists = true; 
	var windowWidth = $window.width();
	var offsetAdjustHeading = -71;
	if (windowWidth < 1100) {
		offsetAdjustHeading = 194;
	}
	var Hdistance = $('#page-heading').offset().top + offsetAdjustHeading;  
}

/* end of caching variables */

/* 'scroll down' arrow */
/* this is only needed on non-course pages, so check for a section nav first */
if ($('#section-nav').length) {
	/* only add the arrow if there is more than one panel on the page */
	if ($('section').length > 1) {
		/* create the button as an element and add to the page */
		$backToTop = $('.sys_back-to-top').first();
		var arrowImgSrc = "img/scroll-down-arrow.png";
		if (window.location.hostname != "www.brighton.ac.uk") {
			arrowImgSrc = "https://www.brighton.ac.uk/_design/img/scroll-down-arrow.png";
		}
		$scrollDown = $('<div id="scroll-down"><a href="#" title="Scroll down"><img src="'+arrowImgSrc+'" width="29" height="29" alt="Scroll down" /></a></div>').insertBefore($backToTop);
		/* note the offset of each panel for checking later */
		$sections = $('section');
		sectionPositions = [];
		$sections.each(function(){
			sectionPositions.push($(this).offset().top);
		});
		/* set up click behaviour */
		/* find the offset of the next section tag on the page after the current position of the arrow */
		$scrollDown.click(function(e) { 
			e.preventDefault();
			/* get the current position of the arrow, check it against the tops of the panels, then scroll to the next one */
			var currentArrowPos = $(this).offset().top - 40;
			var targetScrollPos = sectionPositions[sectionPositions.length-1];
			for (i = 0; i < sectionPositions.length; i++) { 
				if (sectionPositions[i] > currentArrowPos) {
					targetScrollPos = sectionPositions[i] - 164;
					break;
				}
			}
			$('html, body').animate({ scrollTop: targetScrollPos }, 750, 'swing');
		});
	}
}

$window.scroll(function() {
	
	/* fix to stop docking behaviour on tablets and mobiles */
	if ($window.width() > 980) {
	
		/* if the navigation bar reaches the top of the page, fix it in place */ 
		if ( $window.scrollTop() >= TNdistance ) {
			$docBody.addClass('sys_top-nav-fixed');
		}
		/* if you scroll back up, release the navigation bar back into its original position */
		if ( $window.scrollTop() < TNdistance ) {
			$docBody.removeClass('sys_top-nav-fixed');
		}
		/* this script is for course pages and docks their special menu */
		/* it only runs if that menu is present on the page */
		if (courseNavExists) {
			/* if the heading reaches the top of the page, fix it and the course nav in place */ 
			if ( $window.scrollTop() >= Hdistance ) {
				$docBody.addClass('sys_top-header-fixed sys_course-nav-fixed');
			}
			/* if you scroll back up, release the heading back into its original position */
			if ( $window.scrollTop() < Hdistance ) {
				$docBody.removeClass('sys_top-header-fixed sys_course-nav-fixed');
			}
		}
	
	}
});

/* invoke the scrollspy plug in thing (course page only so check if course nav exists first) */
/* this could be replaced by Bootstrap's built in function - required scripts are below */
if (courseNavExists) {
	$('#course-nav-menu').onePageNav({
		 // obviously you can choose the class name it appends
		currentClass: 'sys_selected',
		changeHash: false,
		scrollSpeed: 750,
		// use the offset so the heading isn't obscured by the fixed nav
		// scrollOffset: 177
		// value changed because breadcrumb removed
		scrollOffset: 137,
		begin: function() {
			$('#course-nav-menu a').blur();
		}
  	}); 
}

// anchor link scripts
// when a page loads with a hash in the url
$(window).load(function()
{
initialAnchorScroll(164);
});

});

})(jQuery);