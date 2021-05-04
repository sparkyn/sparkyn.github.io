(function($) {

$(function() {

  // hide the tabs on the page, so they are only visible immediately to users with no Javascript
  $('.sys_section-content-tab').addClass('hideform');

  // build the new-style selection buttons that replace the tabs
  var setOfTabs = $('.sys_section-content').children('.sys_section-content-tab'); 
  if (setOfTabs.length > 1) { 
	  var i = 1;    
	  var buildUL = '<ul class="sys_forms-section-tabs" style="display: none;">'; 
	  setOfTabs.each(function(){ 
		  $(this).addClass('form-tab-' + i); 
		  var thisFormHeading = $(this).find('.sys_tabHeading').first().text(); 
		  buildUL += '<li><a href="form-tab-' + i + '" class="search-results-button-' + i + '">' + thisFormHeading +'</a>'; i++; 
	  }); 
	  buildUL += '</ul>';	
	  $('.sys_section-content').before(buildUL); 
	  // attach the click behaviour to show the chosen set of results
	  $('ul.sys_forms-section-tabs li a').click(function(e) { 
		  e.preventDefault(); 
		  var thisTarget = $(this).attr('href'); 
		  $('div.sys_section-content-tab').hide().addClass('hideform').removeClass('showform'); 
		  $('.' + thisTarget).show().addClass('showform').removeClass('hideform'); 
		  $('ul.sys_forms-section-tabs li').removeClass('sys_selected'); 
		  $(this).parent().addClass('sys_selected'); 
		  $('section .sys_section-content').css('padding', '16px 0'); 
	  }); 
	 tabsBuilt = true;
  } 
  // get the counts for the two types of results and total them
  var courseCount = $('#courselistdynamic li').length;
  restCount = 0;
  if ($('.sys_paginginforecordcount').length) {
	  restCount = parseInt($('.sys_paginginforecordcount').text());
  }
  var totalCount = courseCount + restCount;
  // get the search term in case it is needed below
  var searchTerm = $('#search-term').text();
  // add the number of results to the 'All other results' button
  $('.sys_forms-section-tabs a').eq(1).append(' (' + restCount + ')'); 
  // update the text on the page with the total results or a message to say there are none
  if (totalCount > 0) {
  	$('#sys_total-results').text(restCount + ' page results');
  }
  else {
	$('#sys_search-results-intro').html("We're sorry but your search for '" + searchTerm + "' returned <span id='sys_total-results'>0</span> results. Please try searching for another term."); 
  }
  
  // insert the search term used into the main site search box	
  $('div.sys_site-search').find('input').first().attr('value', searchTerm);
  
  // fix the styling of the course search results
 // $('#course-data .sys_span12').removeClass('sys_span12');
		
  // show the 'All other results' section if someone uses the pager  
  function checkPagination() {
	  var currentUrl = window.location.href;
	  if(currentUrl.indexOf('GoToPage') != -1) {
		  $('.sys_forms-section-tabs li').removeClass('sys_selected');
		  $('.sys_forms-section-tabs li').last().addClass('sys_selected');
		  $('.sys_section-content-tab').hide();
		  $('.sys_section-content-tab').last().addClass('showform').show();
		  $('section .sys_section-content').css('padding', '16px 0'); 
	  }
  }
  function checkTabs() {
	  if (!tabsBuilt) {
		  setTimeout(function () {
			  if(tabsBuilt) { 
				  checkPagination()
			  }
			  checkTabs();
		  }, 500);
	  }
  }
  
  checkPagination();
  checkTabs(); 


});

})(jQuery);