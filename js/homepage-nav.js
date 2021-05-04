(function($) {

$(function() {

/* assign various parts of the DOM to variables to cache them and reduce script execution time */
$window = $(window);
var $megaMenus = $('#header').find('div.sys_mega-menu');
var $megaMenuLinks = $('#header').find('a.sys_mega-menu-link');
var $topNavListItems = $('#header').find('#top-nav li');

/* end of caching variables */

/* scripts for mega menu display */
$megaMenuLinks.click(function(e) {
	e.preventDefault();
	
	$(this).blur();

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
});

$('#header').find('#top-nav div.sys_container').click(function(event){
     event.stopPropagation();
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
	$('.sys_' + selTog).addClass('sys_tog').slideToggle();
	return false;
});

function closeMobileNav() {
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
		$('#top-nav-menu').slideDown(400);
		$('body').addClass('sys_mobile-nav-open');
		return false
	}
});

$(window).bind('ready resize', function(){
	var w = $(window).width();
	if((w > 980) && ($('body').hasClass('sys_mobile-nav-open'))) {
		closeMobileNav();
		$('#top-nav-menu').show();
	}
	if(w > 990) { $('#top-nav-menu, .sys_footer-links ul').removeAttr("style"); }
});

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}

// footer menus behaviour for mobile layout
$('.sys_footer-links h2').click(function(e) {
	e.preventDefault();
	if ($(window).width() < 990) {
		$(this).siblings('ul').first().slideToggle();
	}
});	
	
}); //close $(function() {
})(jQuery); //END homepage-nav.js

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