$(document).ready(function() {

/* assign various parts of the DOM to variables to cache them and reduce script execution time */
$window = $(window);
var $docBody = $('body');
var $pageBodyDiv = $('#page-body');

var $megaMenus = $('#header').find('div.sys_mega-menu');
var $megaMenuLinks = $('#header').find('a.sys_mega-menu-link');
var $breadcrumbSubNavs = $('#header').find('ul.sys_subnav');
var $breadcrumbsTopLinks = $('#active-breadcrumbs').find('li.sys_toplink');
var $topNavListItems = $('#header').find('#top-nav li');

var breadcrumbsExists = false;
if ($('#active-breadcrumbs').length) { 
	breadcrumbsExists = true; 
	$breadcrumbs = $('#active-breadcrumbs');
	$('#section-nav').removeClass('sys_shadow');
}
/* end of caching variables */


/* scripts for mega menu display */
$megaMenuLinks.click(function(e) {
	e.preventDefault();
	
	// close any breadcrumb menus to prevent overlap 
	$breadcrumbSubNavs.hide();
	$breadcrumbsTopLinks.removeClass('sys_topselected');
	
	// get id of clicked on link
	var thisID = this.id;
	thisID = "#mega-menu-" + thisID;
	
	if ( $(thisID).is(":visible") ) {
    	// if chosen menu is already visible, hide all menus
		$megaMenus.hide();
		$topNavListItems.removeClass('sys_selected');
	} else { 
		// else hide them and then show the selected menu
    	$megaMenus.hide();
		$(thisID).show();
		$topNavListItems.removeClass('sys_selected');
		$(this).parent().addClass('sys_selected');
	}
	
	
	
	
});

// script to close the mega menu and other menus if you click elsewhere in the document
$('html').click(function() {
 	$megaMenus.hide();
	$topNavListItems.removeClass('sys_selected');
	
	$breadcrumbSubNavs.hide();
	$breadcrumbsTopLinks.removeClass('sys_topselected');
});

$('#header').find('#top-nav div.sys_container').click(function(event){
     event.stopPropagation();
});

if (breadcrumbsExists) {
	$breadcrumbs.click(function(event){
		 event.stopPropagation();
	});
}

if ($('#active-breadcrumbs .sys_subnav').length) {
	$breadcrumbSubNavs.click(function(event){
		 event.stopPropagation();
	});
}

// script to demonstrate video/image rollover state
// this has been replaced by the script below
/*$(".hover-state").hover(	
	function () {
		currentSrc = $(this).attr('src');
		var parts = currentSrc.split('.');
		var filenameOnly = parts[0];
		var newSrc = filenameOnly + "-2." + parts[1];
		$(this).attr('src', newSrc);
		$(this).css('cursor', 'pointer');
	},
	function () {
		$(this).attr('src', currentSrc);
	}
);*/

// script for video caption rollover state (replaces the above .hover-state function)
$(".sys_video-image").hover(	
	function () {
		$(this).find('.sys_play-arrow').addClass('sys_play-arrow-hover');
		$(this).css('cursor', 'pointer');
	},
	function () {
		$(this).find('.sys_play-arrow').removeClass('sys_play-arrow-hover');
	}
);

// script to move you back to the previous heading

$('.sys_previous-heading-link').click(function(e) {
	e.preventDefault();
	
	// get the parent section of this link
	parentSection = $(this).parents('section');
	// start a marker to track which section tag you're searching through
	prevContentRow = parentSection;
	// start a marker to flag when you've found a target heading to scroll to
	foundTarget = false;
	// start a marker to halt the search so it won't loop forever
	searchComplete = false;
	
	while(!(searchComplete)) {
		
		// see if there is a section tag earlier on the page. If there is, move the marker to it
		if (prevContentRow.prev('section').length) {
			prevContentRow = prevContentRow.prev('section');
		}
		// if there isn't, end the search because you're at the top of the page already
		else {
			searchComplete = true;
		}	
		
		if (!(searchComplete)) {
			// search the currently marked content row
			rowToSearch = prevContentRow;
			// see if there are any h2 tags
			if (rowToSearch.find('h2').length) {
				targetHeading = rowToSearch.find('h2').first();
				foundTarget = true;
				searchComplete = true;
			}
			// if there aren't, see if there are any h3 tags
			else if (rowToSearch.find('h3').length) {
				targetHeading = rowToSearch.find('h3').first();
				foundTarget = true;
				searchComplete = true;
			}
			// if there still aren't, do nothing so the loop starts again
			else {
			
			}
		}
	
	}
	// if you have found a target heading, scroll to it
	if (foundTarget) {
			$.scrollTo(targetHeading, 750, {offset: -177} );
	}
	
});



/* scripts for active breadcrumb display */
$breadcrumbsTopLinks.children('a').click(function(e) {
	e.preventDefault();
	
	var subMenu = $(this).siblings('ul');
	
	if ( subMenu.is(":visible") ) {
    	// if chosen menu is already visible, hide all menus
		$breadcrumbSubNavs.hide();
		$breadcrumbsTopLinks.removeClass('sys_topselected');
	} else { 
		// else hide them and then show the selected menu
    	$breadcrumbSubNavs.hide();
		$breadcrumbsTopLinks.removeClass('sys_topselected');
		$(this).parent().addClass('sys_topselected');
		subMenu.show();
	}
	
});

// script for back to top button just above footer
$('.sys_back-to-top a').click(function(e) {
	
	$.scrollTo('#page-wrapper', 750);
	
	e.preventDefault();
	
});

//Toggle select function

$('.sys_toggle-select').not('.sys_toplink').click(function() {
	if(!$(this).hasClass("sys_selected-element")){
		$(this).addClass("sys_selected-element");
	}
	
	else{
		$(this).removeClass("sys_selected-element");
	}
});


// script to make the panels alternate between grey and white
if ($('section').length) {
    $('section:even').addClass('sys_grey');
    
    if ($('div.sys_back-to-top').length) {
        
        if ($('#page-body section').last().hasClass('sys_grey')) {
            $('div.sys_back-to-top').addClass('sys_grey');
        }
    }
}

// script to hide the last 'previous story' link on a page, so it doesn't sit next to the 'back to top' link
if ($('#page-body section .sys_previous-heading-link').length) {
    $('#page-body section').last().find('.sys_previous-heading-link').hide();
}
	
});


