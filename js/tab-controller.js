$(document).ready(function() {
	



// script to build the set of headings for a group of tabs
// targets the element with the class 'tabHeading' on each tab and then builds them into a list
// first list item has the class 'selected' added to it.
tabsBuilt = false;
if ($('.sys_section-content').length) {
  var tabCounter = 1;
  $('.sys_section-content').each(function(){

	var setOfTabs = $(this).children('.sys_section-content-tab');
	
	if (setOfTabs.length > 1) {
		buildList = '<ul class="sys_section-tabs">';
		var firstPass = true;
		
		setOfTabs.each(function(){
	
			grabbedHeading = $(this).find('.sys_tabHeading').first().text();
			cleanedHeading = grabbedHeading.replace(/[^a-zA-Z0-9]/g, '-');
			if (firstPass) {
				liToAdd = '<li class="sys_selected sys_firstTabLi"><a id="' + cleanedHeading + '-' + tabCounter + '" href="#">' + grabbedHeading + '</a></li>';
			}
			else {
				liToAdd = '<li><a id="' + cleanedHeading + '-' + tabCounter + '" href="#">' + grabbedHeading + '</a></li>';
			}
			firstPass = false;
			buildList = buildList + liToAdd;
	
			$(this).attr('id', cleanedHeading + '-' + tabCounter + '-tab');
			tabCounter++;
		})
	
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
	$(targetID).show();

	// set selected class on correct tab link only
	$(this).parent().parent().children('li').removeClass('sys_selected');
	$(this).parent().addClass('sys_selected');

	$(window).trigger('resize');
	
});


/* #Sigchange# */

/*$('.sys_mobile-collapse-column').show();

$(window).resize(function() {
	if($(window).width() > 768){
		$('.sys_mobile-collapse-column').show();
		/-* #Simonchange# *-/ 
		$('.sys_section-content-tab').hide();
		$('.sys_firstTab').show();
		$('.sys_section-tabs li').removeClass('sys_selected');
		$('.sys_firstTabLi').addClass('sys_selected');
		/-* #Simonchange# *-/ 
	}
	if ($(window).width() < 980) {
		$('body').removeClass('sys_top-nav-fixed sys_top-header-fixed sys_section-nav-fixed sys_course-nav-fixed');
	}

});*/

/* #Sigchange# */

});