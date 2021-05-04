$(document).ready(function() {

/* assign various parts of the DOM to variables to cache them and reduce script execution time */
$window = $(window);
var $docBody = $('body');
var $pageBodyDiv = $('#page-body');


/* calculate how far from the top of the page each navigation bar is */
var TNdistance = $('#top-nav').offset().top;
var Hdistance = $('#page-heading').offset().top+110;
var sectionNavExists = false;
var courseNavExists = false;
var breadcrumbsExists = false;
if ($('#section-nav').length) { 
	sectionNavExists = true; 
	var $sectionNav = $('#section-nav');
	var SNdistance = $sectionNav.offset().top-88; 
	$('#section-menu').find('li a').last().addClass('sys_last');
}
if ($('#course-nav').length) { 
	courseNavExists = true; 
	var $courseNav = $('#course-nav');
	var CNdistance = $courseNav.offset().top-86; 
}
if ($('#active-breadcrumbs').length) { 
	breadcrumbsExists = true; 
	$breadcrumbs = $('#active-breadcrumbs');
}
/* end of caching variables */

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
		/* if the heading reaches the top of the page, fix it in place */ 
		if ( $window.scrollTop() >= Hdistance ) {
			$docBody.addClass('sys_top-header-fixed');
		}
		/* if you scroll back up, release the heading back into its original position */
		if ( $window.scrollTop() < Hdistance ) {
			$docBody.removeClass('sys_top-header-fixed');
		}
		/* this script is for non-course pages and docks their menu */
		/* it therefore only runs if that menu is present on the page */
		if (sectionNavExists) {
			if ( $window.scrollTop() >= SNdistance ) {
				$docBody.addClass('sys_section-nav-fixed');
				if (breadcrumbsExists) {
					$pageBodyDiv.addClass('sys_breadcrumb-padding');
				}
			}
			/* if you scroll back up, release the course nav back into its original position */
			if ( $window.scrollTop() < SNdistance ) {
				$docBody.removeClass('sys_section-nav-fixed');
				if (breadcrumbsExists) {
					$pageBodyDiv.removeClass('sys_breadcrumb-padding');
				}
			}
			if (!breadcrumbsExists) { $sectionNav.addClass('sys_shadow'); }
		}
		/* this script is for course pages and docks their special menu */
		/* it only runs if that menu is present on the page */
		if (courseNavExists) {
			/* if the heading reaches the top of the page, fix it in place */ 
			if ( $window.scrollTop() >= CNdistance ) {
				$docBody.addClass('sys_course-nav-fixed');
			}
			/* if you scroll back up, release the course nav back into its original position */
			if ( $window.scrollTop() < CNdistance ) {
				$docBody.removeClass('sys_course-nav-fixed');
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
		scrollOffset: 137
  	}); 
}
  
/* DOCKING MENUS
================================================================================= */


/* this script is for non-course pages and docks their menu */
/* it therefore only runs if that menu is present on the page */
if ($('#section-nav').length) {
	/* calculate how far from the top of the page the section nav is */
	var SNdistance = $('#section-nav').offset().top-80;
	
	$window.scroll(function() {
		
		/* fix to stop docking behaviour on tablets and mobiles */
		if ($window.width() > 980) {
		
			/* if the heading reaches the top of the page, fix it in place */ 
			if ( $window.scrollTop() >= SNdistance ) {
				$('body').addClass('sys_section-nav-fixed');
				if ($('#active-breadcrumbs').length) {
					$('#page-body').addClass('sys_breadcrumb-padding');
				}
			}
			/* if you scroll back up, release the course nav back into its original position */
			if ( $window.scrollTop() < SNdistance ) {
				$('body').removeClass('sys_section-nav-fixed');
				if ($('#active-breadcrumbs').length) {
					$('#page-body').removeClass('sys_breadcrumb-padding');
				}
			}
		}
	});
}

/* Columnizer 
================================================================================= */

/* on course pages, invoke the jQuery Columnizer plug in to flow the entry requirements over two columns */
if ($('.sys_columnized').length) {
	var $columnizedAreas = $('.sys_columnized');
	$columnizedAreas.find('strong').addClass("sys_dontend");
	$columnizedAreas.find('b').addClass("sys_dontend");
    $columnizedAreas.find('.sys_span12').columnize({columns:2, cssClassPrefix: "sys_"});
	
}

});