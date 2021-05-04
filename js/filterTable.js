function filterTable(tableID, labelText, hideByDefault) {
	
	// set default value for hideByDefault variable
	if ( typeof(hideByDefault)==='undefined') hideByDefault = false;
	
	// input id
	var inputID = tableID + 'input';
	
	// create input and insert into page
	$("<input>", { id: inputID,	type: 'text' }).insertBefore('#' + tableID);
	
	// create label and insert into page
	$("<label />").attr('for', inputID).text(labelText).insertBefore('#' + inputID);
	
	// Prevent the form from submitting on Enter
	$('#' + inputID).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
  
	// Filter the table on keyup in the input
	$('#' + inputID).keyup(function(){
		var inputLength = $(this).val().length;
		if ( inputLength > 1 ) 
		{
			// Show only matching rows, hide rest of them
			$('#' + tableID + " tbody>tr").hide();
			$("#" + tableID + " td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		}
		else
		{
			if (hideByDefault) {
				$('#' + tableID + " tbody>tr").hide();
			}
			else {
				$('#' + tableID + " tbody>tr").show();		
			}
		}
	});
  
}
  
// jQuery expression for case-insensitive filter
$.extend($.expr[":"], 
{
  "contains-ci": function(elem, i, match, array) 
  {
	return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});


// script to load international equivalencies information into a tab on course pages
// takes the text from the relevant country page when one of the country names is clicked
(function($) {

$(function() {

	if ($('#countrylistdynamic').length) {
		
		$('#countrylistdynamic a').click(function(event){
			
			// check if page is in mobile layout, for use later
			var isMobileLayout = false;
			if (Modernizr.mq('all and (max-width: 767px)')) {
				isMobileLayout = true;
			}
		
			// stop the click from taking you to the country page
			event.preventDefault();
			// grab the name of the country clicked and prepare it to become the new tab heading
			var thisLinkText = $(this).text();
			// grab the link href that the text will be loaded from
			var targetPage = $(this).attr('href');
			var targetPageClean = targetPage;
			// specify an area of the target page for jQuery to load, to save loading the entire page
			targetPage += " #page-body";
			
			// if a new tab has not already been created, create one
			if (!($('#equivsDiv-tab').length)) {
				var $equivsDiv = $("<div>", {id: "equivsDiv-tab", class: "sys_section-content-tab sys_row"});
				$(this).parents('.sys_section-content').append($equivsDiv);
				var $newTabHeading = $('<li class="sys_selected" style="display: none;"><a id="equivsDiv" href="#">' + thisLinkText + '</a></li>');
				$('#entry .sys_section-tabs li').removeClass('sys_selected');
				$('#entry .sys_section-tabs').append($newTabHeading);
				// add mobile expander heading too
				var $newExpanderHeading = $('<div class="sys_tabs-opener" style=""><a id="equivsDiv-mob" href="#" class="sys_opener-open">' + thisLinkText + '</a></div>');
				$('#equivsDiv-tab').before($newExpanderHeading);
				var $equivsLink = $('#equivsDiv').parent();
			}
			// otherwise use the pre-existing tab
			else {
				var $equivsDiv = $('#equivsDiv-tab');
				$('#entry .sys_section-tabs li').removeClass('sys_selected');
				$('#equivsDiv').html(thisLinkText).parent().addClass('sys_selected');
				// update mobile expander heading too
				$('#equivsDiv-mob').html(thisLinkText)
				var $equivsLink = $('#equivsDiv').parent();
			}
			
	
			// try to load the text from the target page
			$equivsDiv.load(targetPage, function(response, status, xhr) {
				 // if the load fails for some reason, make the link take you to the target page instead 
				if ( status == "error" ) {
					window.location.href = targetPageClean;
					return false;
				}
				// if the target page is arranged in tabs, take the text from the 'Entry requirements' tab
				if ($(this).find('.sys_tabHeading:contains("Entry requirements")').length) {
					var filteredContent = $(this).find('.sys_tabHeading:contains("Entry requirements")').first().parent().parent().html();
					$(this).html(filteredContent);
					// hide the first paragraph and first horizontal rule because they don't make sense when read in this context
					$(this).find('p:eq(1)').hide();
					$(this).find('hr:eq(0)').hide();
					// change the tab heading to the new one - especially necessary for the mobile view
					$(this).find('.sys_tabHeading').html(thisLinkText);
					$equivsLink.show();
				}
				// if the target page is not arranged in tabs, take the text from the second panel of the page
				else {
					// check for EU advice panel, if present then get the third panel's content instead
					var filteredContent = "";
                  	 if ($(this).find('h2:contains("Advice for EU students")').length) {
                    	filteredContent = $(this).find('.sys_top').first().next('section').next('section').find('.sys_row').html();
                    }
                  	 else {
                    	filteredContent = $(this).find('.sys_top').first().next('section').find('.sys_row').html();
                  	 }	
					$(this).html(filteredContent);
					// add a tab heading to the content - especially necessary for the mobile view
					var tabHead = $("<p>", {class: "sys_tabHeading"}).html(thisLinkText);
					$(this).find("[class^='sys_span']").first().prepend(tabHead);
					$equivsLink.show();
				}
				// hide the other tabs, only if we are in the desktop layout 
				if (!isMobileLayout) {
					$('#entry .sys_section-content-tab').hide();
				}
				// Show the newly constructed tabs
				$equivsDiv.show();
				// if in mobile layout, scroll to new div
				if (isMobileLayout) {
					var scrollPosition = $('#equivsDiv-mob').offset().top-80;
					$('html, body').animate({ scrollTop: scrollPosition }, 750, 'swing');
				}
			});
	
			// bind the normal behaviour to the new tab heading so you can still switch around between the tabs
			// note that the ID #equivsDiv refers to the LINK that opens the tab, not the tab
			$('#equivsDiv').off('click');
			$('#equivsDiv').click(function(e) {
				e.preventDefault();
				$('#entry .sys_section-content-tab').hide();
				$('#equivsDiv-tab').show();
				$('#entry .sys_section-tabs li').removeClass('sys_selected');
				$(this).parent().addClass('sys_selected');
			});

			// bind the normal behaviour to the new mobile tab expander so you can still switch around between the expanders
			// note that the ID #equivsDiv refers to the LINK that opens the tab, not the tab
			$('#equivsDiv-mob').off('click');
			$('#equivsDiv-mob').click(function(e) {
				e.preventDefault();
				$('#equivsDiv-tab').slideToggle();
				$(this).blur().toggleClass('sys_opener-open');
			});
			
			
			
		});
	
	}

});

})(jQuery);
