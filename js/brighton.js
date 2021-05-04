(function($) {

$(function() {

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
	$(this).blur();

	// get id of clicked on link
	// var thisID = this.id;
	// thisID = "#mega-menu-" + thisID;
	
	// select the mega menu to target, which is next to the clicked link
	var targetMegaMenu = $(this).nextAll('.sys_mega-menu').first();
	
	if ( targetMegaMenu.is(":visible") ) {
    	// if chosen menu is already visible, hide all menus
		$megaMenus.hide();
		$topNavListItems.removeClass('sys_selected');
	} else { 
		// else hide them and then show the selected menu
    	$megaMenus.hide();
		targetMegaMenu.show();
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
			//$.scrollTo(targetHeading, 750, {offset: -177} );
			var scrollPosition = targetHeading.offset().top-177;
			//var scrollPosition = 0;
     		$('html, body').animate({ scrollTop: scrollPosition }, 750, 'swing');
	}
	
});



/* scripts for active breadcrumb display */
$breadcrumbsTopLinks.children('a').click(function(e) {
	var w = $(window).width();
		if (w > 980) {
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
	}
});

// script for back to top button just above footer
$('.sys_back-to-top > a').click(function(e) {

	//$.scrollTo('#page-wrapper', 750);
	
	 e.preventDefault();
	 var scrollPosition = 0;
     $('html, body').animate({ scrollTop: scrollPosition }, 750, 'swing');
	
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


// script to make the panels alternate between grey and white - removed 30/03/17
/*if ($('section').length) {
    $('section:odd').addClass('sys_grey');
    
    if ($('div.sys_back-to-top').length) {
        
        if ($('#page-body section').last().hasClass('sys_grey')) {
            $('div.sys_back-to-top').addClass('sys_grey');
        }
    }
}*/

// script to hide the last 'previous story' link on a page, so it doesn't sit next to the 'back to top' link
if ($('#page-body section .sys_previous-heading-link').length) {
    $('#page-body section').last().find('.sys_previous-heading-link').hide();
}


$('.sys_toggle-trigger').click(function(){
	if (!$(this).hasClass('sys_active-trig')) {
		$(this).addClass('sys_active-trig');
	}	
	else {
		$(this).removeClass('sys_active-trig');
	}
	selTog = $(this).attr('rel');
	// added fix for Contensis stripping out rel tag on mobile search toggle
	if ($(this).hasClass('sys_search-trigger')) { selTog = 'site-search'; }
	$('.sys_' + selTog).addClass('sys_tog').toggle();
	return false;
});

function closeMobileNav() {
	$('#top-nav .sys_site-search').hide();
	$('#top-nav-menu').slideUp(400, function() {
		$('body').removeClass('sys_mobile-nav-open');
	  });
}

$('.sys_mobile-nav-trigger').click(function(){	
	if(($('body').hasClass('sys_mobile-nav-open'))) {
		closeMobileNav();
		return false; 
	}
	else {
		$('#top-nav-menu').slideDown(400, function(){
			$('#top-nav .sys_site-search').show();
		});
		$('body').addClass('sys_mobile-nav-open');
		return false
	}
}); 
/* copy section nav into mobile menu if present */
if ($('#section-menu').length) {
	var sectionNav = $('#section-menu li').clone();
	sectionNav.addClass('sys_sec-in-meg sys_hidden-desktop');
	var navLis = $('<li class="sys_hidden-desktop sys_mobile-mega-header sys_sec-in-meg" id="mobile-section-nav">In this section...</li>')
		.add(sectionNav)
		.add('<li class="sys_hidden-desktop sys_mobile-mega-header sys_mobile-mega-header-main">Main site links</li>'); 
	var targetLi = $('#top-nav .sys_close').first();
	navLis.insertAfter(targetLi);
}

$(window).bind('ready resize', function(){
	var w = $(window).width();
	if((w > 980) && ($('body').hasClass('sys_mobile-nav-open'))) {
		closeMobileNav();
		$('#top-nav-menu').show();
	}
	if(w > 990) { $('#top-nav-menu, .sys_footer-links ul').removeAttr("style"); }
});

/* #Sigchange# */

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}

//Remove date suffixes from Calendar listing (Events Module)
$("#Calendar__List.sys_datarepeatercontrol .sys_groupheader span").text(function () {
    return $(this).text().replace(/(\d{1,2})(th|st|nd|rd)/, "$1");
});

//Load Google Maps markers if a sys_gmap360_canvas exists on the page
if(jQuery(".sys_gmap360_canvas").length > 0) jQuery.getScript("//www.brighton.ac.uk/_design/js/360/gmap360v2.js?v=5");

//Improve Zengenti's default FormModule datePicker implementation (use setTimeout to wait for .hasDatepicker classes to be assigned)
if(typeof jQuery.datepicker !== "undefined") setTimeout(function(){
	jQuery(".hasDatepicker").datepicker( "option", "changeYear", true );
	jQuery(".hasDatepicker").datepicker( "option", "changeMonth", true );
	//Student datepicker
	jQuery(".dobDatepicker .hasDatepicker").datepicker( "option", "yearRange", "c-40:+0" );
	jQuery(".dobDatepicker .hasDatepicker").datepicker( "option", "defaultDate", "-18y -6m" );
	//Alumni datepicker
	jQuery(".aluDatepicker .hasDatepicker").datepicker( "option", "yearRange", "c-110:+0" );
}, 1000);


function scrollToPageAnchor(anchorName, topOffset) {
	topOffset = typeof topOffset !== 'undefined' ? topOffset : 164;
	var scrollTarget = anchorName;
	// new campaign page template uses id #page-title instead of #page-heading
	// use this to apply a different offset to the anchor link scrolling 
	if ($('#page-title').length) {
		topOffset = 16;
	}
	scrollPosition = $(scrollTarget).offset().top-topOffset;
	$('html, body').animate({ scrollTop: scrollPosition }, 750, 'swing');	
}

// anchor link scripts
// when an anchor link is clicked on a page
$('#page-body a[href^="#"]').click(function(e) {
	var scrollTarget = $(this).attr('href');
	if ($(scrollTarget).length) { 
		e.preventDefault();
		scrollToPageAnchor(scrollTarget);
	}
});

$('.sys_skiplinks a[href^="#page-body"]').click(function(e) {
	if ($('#page-body').length) { 
		e.preventDefault();
		scrollToPageAnchor('#page-body');
		$('#page-body').attr('tabindex', -1).on('blur focusout', function () {
        	$(this).removeAttr('tabindex');
        }).focus();
	}
});


// SCRIPTS FROM TAB-CONTROLLER.JS FROM THIS POINT TO END OF JQUERY - MOVED HERE AS PART OF NEW TAB BEHAVIOUR ON MOBILES

// script to build the set of headings for a group of tabs
// targets the element with the class 'tabHeading' on each tab and then builds them into a list
// first list item has the class 'selected' added to it.
tabsBuilt = false;
if ($('.sys_section-content').length) {
  var tabCounter = 1;
  $('.sys_section-content').each(function(){

	var setOfTabs = $(this).children('.sys_section-content-tab');
	
	if (setOfTabs.length > 1) {
		buildList = '<ul class="sys_section-tabs" role="tablist">';
		var firstPass = true;
		
		setOfTabs.each(function(){
			// build desktop tabs
			grabbedHeading = $(this).find('.sys_tabHeading').first().text();
			cleanedHeading = grabbedHeading.replace(/[^a-zA-Z0-9]/g, '-');
			var tabControllerId = cleanedHeading + '-' + tabCounter;
			var tabId = tabControllerId + '-tab';
			var openerId = tabControllerId + '-mob';

			$(this).attr('id', tabId);
			$(this).attr('role', 'tabpanel');
			$(this).attr('aria-labelledby', tabControllerId + ' ' + openerId);

			if (firstPass) {
				liToAdd = '<li class="sys_selected sys_firstTabLi" role="presentation"><a id="' + tabControllerId + '" href="#" role="tab" aria-selected="true" aria-controls="'+ tabId +'">' + grabbedHeading + '</a></li>';
			}
			else {
				liToAdd = '<li role="presentation"><a id="' + tabControllerId + '" href="#" role="tab" aria-selected="false" aria-controls="'+ tabId +'">' + grabbedHeading + '</a></li>';
			}
			
			buildList = buildList + liToAdd;
	
			// build mobile expanders
			var linkDiv = '<div class="sys_tabs-opener" style="">';
			if (firstPass) {
				linkDiv = linkDiv +  '<a id="' + openerId + '" href="#" class="sys_opener-open" role="button" aria-expanded="true" aria-controls="'+ tabId +'">' + grabbedHeading + '</a></div>';
			}
			else {
				linkDiv = linkDiv +  '<a id="' + openerId + '" href="#" role="button" aria-expanded="false" aria-controls="'+ tabId +'">' + grabbedHeading + '</a></div>';
			}
			$(this).before(linkDiv);

			tabCounter++;
			firstPass = false;

		});
	
		buildList = buildList + '</ul>';
		$(this).before(buildList);
		// display only the first tab in the group
		setOfTabs.hide();
		// this class helps reset the page when changing from mobile to desktop layouts
		setOfTabs.first().show().addClass('sys_firstTab');
	
	}
	else if ( setOfTabs.length == 1 ) {
		// this class helps reset the page when changing from mobile to desktop layouts
		setOfTabs.first().addClass('sys_firstTab');
	}
	tabsBuilt = true;
  });
}


	
// scripts to control the display of sets of tabs within content areas, e.g. course in detail
// all the multiple parents could probably be simplified
$('.sys_section-tabs li a').click(function(e) {
	e.preventDefault();
	
	// get id of clicked on link
	var thisID = $(this).attr('id');
	targetID = "#" + thisID + "-tab";
	$(this).parent().parent().parent().children('.sys_section-content').children('div.sys_section-content-tab').hide();
	$(this).blur();
	$(targetID).show();

	// set selected class on correct tab link only
	$(this).parent().parent().children('li').removeClass('sys_selected').children('a').attr('aria-selected', 'false');
	$(this).parent().addClass('sys_selected').children('a').attr('aria-selected', 'true');

	//refresh Google Maps if there are any in the target tab
	if ($(targetID + ' .sys_gmap360_canvas').length) {
		initializeMaps();
	}
	//refresh Leaflet Maps if there are any on page in case they were initiaised in a hidden tab
	if(typeof maps != 'undefined' && maps.length){
		var len = maps.length;
		for(var i=0; i<len; i++){
			if(typeof maps[i].invalidateSize == 'function'){
				maps[i].invalidateSize();
			} 
		}
	}	
	
});

// script to control opening and closing of mobile tab expanders
$('.sys_tabs-opener a').click(function(e) {
	e.preventDefault();
	
	// get id of clicked on link
	var thisID = $(this).attr('id');
	targetID = "#" + thisID.replace("-mob", "-tab");
	$(targetID).slideToggle();
	$(this).blur()
	if ($(this).hasClass('sys_opener-open')) {
		$(this).removeClass('sys_opener-open').attr('aria-expanded', 'false');
	}
	else {
		$(this).addClass('sys_opener-open').attr('aria-expanded', 'true');
	}

	//refresh Google Maps if there are any in the target tab
	if ($(targetID + ' .sys_gmap360_canvas').length) {
		initializeMaps();
	}
	//refresh Leaflet Maps if there are any on page in case they were initiaised in a hidden tab
	if(typeof maps != 'undefined' && maps.length){
		var len = maps.length;
		for(var i=0; i<len; i++){
			if(typeof maps[i].invalidateSize == 'function'){
				maps[i].invalidateSize();
			} 
		}
	}	
	
});

// scripts for page rating form
$('.sys_rating-form .sys_hiddenfield input').slice(1).attr('value', window.location.href);
$('.sys_rating-form-title').click(function(e) { 
	if ($('.sys_rating-form').hasClass('sys_flyout-open')) { 
		$('.sys_rating-form').slideUp().removeClass('sys_flyout-open'); 
		$('.sys_back-to-top > a').css('z-index', '40');  
	} 
	else { 
		$('.sys_rating-form').slideDown().addClass('sys_flyout-open'); 
		$('.sys_back-to-top > a').css('z-index', '5');  
		} 
}); 
$('.sys_star-rating span').hover(function() {$(this).prevAll('span').find('label').toggleClass('hovered'); });  
$('.sys_star-rating label').each(function() {$(this).attr('title', $(this).text()); });  
$('.sys_star-rating label').click(function() {
	var labelsToStar= $(this).parent().prevAll('span').find('label'); 
	$('.sys_star-rating label').removeClass('hovered-sel'); 
	labelsToStar.addClass('hovered-sel'); 
});


// footer menus behaviour for mobile layout
$('.sys_footer-links h2').click(function(e) {
	e.preventDefault();
	if ($(window).width() < 990) {
		$(this).siblings('ul').first().slideToggle();
	}
});	
	
}); //close $(function() {
})(jQuery); //END brighton.js

function initialAnchorScroll(topOffset) {
	topOffset = typeof topOffset !== 'undefined' ? topOffset : 164;
	if (window.location.hash) {
		var scrollTarget = window.location.hash;
		scrollTarget = scrollTarget.replace(/[&=]/g, '');
		if (jQuery(scrollTarget).length) {
    		var scrollPosition = jQuery(scrollTarget).offset().top-topOffset;
    		jQuery('html, body').animate({ scrollTop: scrollPosition }, 0);
		}
	}
} // end of initialAnchorScroll function
