// Globals
// hash string for checking later
var lastHash = ''; 
var coursesToSearch = null;
// store search term to make sure a search only gets pushed once
var lastSearchRecorded = '';

function enableSearch() {
	
	$('#loading-graphic').remove();
	$('.sys_search-options').show();
	
	// prepare the HTML output for each course ready for output from searches and append to each course
	for (var i=0; i < coursesToSearch.length; i++) {
		coursesToSearch[i]['outputHTML'] = buildCourseResult(coursesToSearch[i]);
	}
	
	// Prevent the form from submitting on Enter and run search instead
	$('#courselistdynamicinput').keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			submitSearch(coursesToSearch, false);
			// hide keyboard on mobiles and scroll to results
			if ($('#submitCourseSearch').is(":visible")) {
				$('#courselistdynamicinput').blur();
				$('#courselistdynamic').focus();
				var scrollPosition = jQuery('#courselistdynamic').offset().top-100;
    			jQuery('html, body').animate({ scrollTop: scrollPosition }, 500);
			}
		}
	});
	
	var typingTimer;                // timer identifier
	var doneTypingInterval = 300;   // time in ms, 0.3 seconds
	var pushSearchTimer; 			// push search terms to analytics
	// on keyup, start the countdown
	$('#courselistdynamicinput').on('keyup', function () {
	  clearTimeout(typingTimer);
	  clearTimeout(pushSearchTimer);
	  typingTimer = setTimeout(doneTyping, doneTypingInterval);
	});
	
	// on keydown, clear the countdown 
	$('#courselistdynamicinput').on('keydown', function () {
	  clearTimeout(typingTimer);
	});
	
	// user is "finished typing," do something
	function doneTyping () {
	  // run search when finished typing only on desktop devices
	  if ($('#submitCourseSearch').is(":hidden")) {
			submitSearch(coursesToSearch, true);
	  }
	}
	
	// Also run the search on submit button click
	$('#submitCourseSearch').click(function(event){
		event.preventDefault();
		submitSearch(coursesToSearch, false);
		// hide keyboard on mobiles and scroll to results
		if ($('#submitCourseSearch').is(":visible")) {
			$('#courselistdynamicinput').blur();
			$('#courselistdynamic').focus();
			var scrollPosition = jQuery('#courselistdynamic').offset().top-100;
			jQuery('html, body').animate({ scrollTop: scrollPosition }, 500);
		}
	});
	
	// output all courses on page load
	outputSearchResults(coursesToSearch, 'All', true); 
	
	// if a search has been submitted from elsewhere then run using the keyword from the URL
	runSearchOnPageLoad(coursesToSearch);
	
	// If results are already on the page, filter them when the level radio box is clicked
  	$('input[name="courselevel"]').click(function(event) {
	 if ($('#courselistdynamic').length) {
		 var currentSearchVal = $('#courselistdynamicinput').val();
		 var selectedValue = $('input[name="courselevel"]:checked').val();
		 $('.sys_level-NONE').remove();
		 if (selectedValue == 'All') {
			$('#courselistdynamic > li').show(); 
		 }
		 else if (selectedValue == 'UG') {
			$('#courselistdynamic > li').hide();
			if ($('.sys_level-UG').length) {
				$('.sys_level-UG').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
			}
		 }
		 else if (selectedValue == 'UG-Clearing') {
			$('#courselistdynamic > li').hide();
			if ($('.sys_UG-Clearing').length) {
				$('.sys_UG-Clearing').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results. Please try searching for another term.</p></li>');
			}
		 }
		 else if (selectedValue == 'App') {
			$('#courselistdynamic > li').hide();
			if ($('.sys_level-App').length) {
				$('.sys_level-App').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results of this type. Please try searching for another term.</p></li>');
			}
		 }
		 else if (selectedValue == 'Top') {
			$('#courselistdynamic > li').hide();
			if ($('.sys_level-Top').length) {
				$('.sys_level-Top').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results of this type. Please try searching for another term.</p></li>');
			}
     }
     else if (selectedValue == 'FY') {
			$('#courselistdynamic > li').hide();
			if ($('.sys_level-FY').length) {
				$('.sys_level-FY').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results of this type. Please try searching for another term.</p></li>');
			}
		 }
		 else {
			$('#courselistdynamic > li').hide();
			if ($('.sys_level-PG').length) {
				$('.sys_level-PG').show();
			}
			else {
				$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
			}
		 } 
		 var hashUpdate = 'query=' + currentSearchVal.replace(/\s/g, "+") + '&level=' + selectedValue;
		 location.hash = hashUpdate;
		 lastHash = hashUpdate;
	 }
  });
  
  // add function to run search on hash change for use with back button
  if ("onhashchange" in window) {
	  window.onhashchange = function() {
		var checkHash = '#'+lastHash;
			if (location.hash != checkHash) {
				runSearchOnPageLoad(coursesToSearch);
			}
	  };
  }
}


function submitSearch(coursesToSearch, delayRecording) {
	var delayRecording = typeof delayRecording !== 'undefined' ? delayRecording : false;
	if ( $('#courselistdynamicinput').val().length > 0 ) {
		var searchTerm = $('#courselistdynamicinput').val();
		// add basic sanitisation of input - remove any non alphanumeric characters
		searchTerm = searchTerm.replace(/[^A-Za-z0-9 ]/g, "");
		var searchTermToPush = '' + searchTerm;
		var levelToSearch = $('input[name="courselevel"]:checked').val();
		var searchResults = searchForTerm(searchTerm, coursesToSearch);
		outputSearchResults(searchResults, levelToSearch);
		highlightSearchTerms();
		var pushSearchDelay = 5000; 
		var hashUpdate = 'query=' + searchTermToPush.replace(/\s/g, "+") + '&level=' + levelToSearch;
		if (delayRecording) {
			clearTimeout(pushSearchDelay);
	  		pushSearchTimer = setTimeout(function() { pushSearch(searchTermToPush); }, pushSearchDelay);
			location.hash = hashUpdate;	
			lastHash = hashUpdate;
		}
		else {
			pushSearch(searchTerm);
			location.hash = hashUpdate;	
			lastHash = hashUpdate;
		}
	}
	else {
		// show all courses in alphabetical order if all characters deleted from search box, filtering by level
		var levelToSearch = $('input[name="courselevel"]:checked').val();
		outputSearchResults(coursesToSearch, levelToSearch, true);
		var hashUpdate = 'query=&level=' + levelToSearch;
		location.hash = hashUpdate;	
		lastHash = hashUpdate;
	}
}

function pushSearch(searchTerm) {
	if (searchTerm != lastSearchRecorded) {
		// alert('Search ' + searchTerm + ' pushed to analytics');
		// push to Google Analytics
		if(typeof ga !== 'undefined') { ga('send', 'event', 'Course search', 'submit', searchTerm); }
		lastSearchRecorded = searchTerm;
	}
}

// remove noise words and run basic thesaurus check on search input
function thesaurise(searchTermsArray) {
	var cleanSearchTermsArray = [];
	var noiseWords = ['a', 'an', 'and', 'by', 'from', 'in', 'of', 'the', 'to'];	
	var thesaurus = {
		"accountant": "accounting",
		"accountancy": "accounting",
		"apprenticeships": "apprentice",
		"events": "event",
		"eyitt": "early years",
		"eyts": "early years",
		"it": "information",
		"journalist": "journalism",
  		"math": "mathematics",
		"maths": "mathematics",
		"nurse": "nursing",
		"nurses": "nursing",
		"ot": "occupational therapy",
		"pe": "physical education",
		"resources": "resource",
		"sports": "sport",
		"teap": "tesol",
		"topup": "top-up"
	};
	for (var k=0; k < searchTermsArray.length; k++) {
		// check if noise words exist in the array and remove if they do
		// this check reads as 'if this search term is not found in the noise words array'
		if (!(noiseWords.indexOf(searchTermsArray[k].toLowerCase()) > -1)) {
			// check for words that need replacing from the thesaurus
			$.each(thesaurus, function( key, value ) {
				if (searchTermsArray[k].toLowerCase() == key) {
					searchTermsArray[k] = value;
				}
			});
			cleanSearchTermsArray.push(searchTermsArray[k]);
		}
	}
	return cleanSearchTermsArray;
}

// search through the given array of courses for the search term and return any matches
function searchForTerm(searchTerm, courseArray){
	var matchingCourses = [];
	var searchTermsArrayForCleaning = searchTerm.trim().split(" "); 
	var searchTermsArray = thesaurise(searchTermsArrayForCleaning);
    for (var i=0; i < courseArray.length; i++) {
		var level = courseArray[i].level;
		var title = courseArray[i].title;
		var ucas = courseArray[i].ucas;
		var desc = courseArray[i].desc;
		var strapline = courseArray[i].strapline;
		var primarySubject = courseArray[i].primary;
		var secondarySubject = courseArray[i].secondary;
		// add a weight field for the results
		courseArray[i]['weight'] = 0;
		// only push the course once and only there are some matches
		var pushCourse = false;
		// run the search for as many words as were submitted
		for (var j=0; j < searchTermsArray.length; j++) {
			// create a regular expression for the search term that is case insensitive
			var regSearch = new RegExp(searchTermsArray[j], 'i');
			// search the course titles first
			if (regSearch.test(title)) {
				courseArray[i]['weight'] = courseArray[i]['weight'] + 20;
				// check if whole word match and increase weight 
				var wholeReg = new RegExp("\\b" + searchTermsArray[j] + "\\b", "i");
				if (wholeReg.test(title)) {
					courseArray[i]['weight'] = courseArray[i]['weight'] + 20;
				}
				// check if start of course title match and increase weight 
				var startReg = new RegExp("^" + searchTermsArray[j], "i");
				if (startReg.test(title)) {
					courseArray[i]['weight'] = courseArray[i]['weight'] + 20;
				}
				pushCourse = true;
			}
			// then search ucas codes
			if (regSearch.test(ucas)) {
				courseArray[i]['weight'] = courseArray[i]['weight'] + 20;
				pushCourse = true
			}
			// then search strapline
			if (regSearch.test(strapline)) {
				courseArray[i]['weight'] = courseArray[i]['weight'] + 20;
				pushCourse = true
			}
			// then search course description
			if (regSearch.test(desc)) {
				courseArray[i]['weight'] = courseArray[i]['weight'] + 10;
				pushCourse = true
			}
			// then search subject areas
			if (regSearch.test(primarySubject) || regSearch.test(secondarySubject)) {
				courseArray[i]['weight'] = courseArray[i]['weight'] + 10;
				pushCourse = true
			}
		}
		if (pushCourse) {
			// cap score for partner college courses
			var partnerSearch = new RegExp('partner college', 'i');
			if ((partnerSearch.test(title)) && (courseArray[i]['weight'] > 15) ) {
				courseArray[i]['weight'] = 15;
			}
			matchingCourses.push(courseArray[i]);	
		}
			
		
    }
	// sort the results by weight and put the shorter titles first
	matchingCourses.sort(function(a, b){
		if(b.weight === a.weight) {
			var x = b['title'].length, y = a['title'].length;
			return x > y ? -1 : x < y ? 1 : 0;
		}
 		return b.weight-a.weight
	});
	
	return matchingCourses;
}

// build the individual course results li tags to go into the list of results
function buildCourseResult(course) {
	var resultOutput = '';
	var locations = course.campus.split(",");
	var locationsOutput = ''; 
	var straplineOutput = '';
	var topUpClass = '';
	if (course.title.indexOf('top-up') > -1) {
		topUpClass = ' sys_level-Top';
  	}
  	var foundationYearClass = (course.title.indexOf('foundation year') > -1) ? ' sys_level-FY' : ''
	for (var m=0; m < locations.length; m++) {
		switch(locations[m]) {
		case 'Brighton and Sussex Medical School':
			locationsOutput += '<li class="sys_locbrighton">Brighton and Sussex Medical School</li>';
			break;
		case 'Brighton: Falmer':
			locationsOutput += '<li class="sys_locbrighton">Brighton: Falmer</li>';
			break;
		case 'Brighton: Grand Parade':
			locationsOutput += '<li class="sys_locbrighton">Brighton: City campus</li>';
			break;
		case 'Brighton: City campus':
			locationsOutput += '<li class="sys_locbrighton">Brighton: City campus</li>';
			break;
		case 'Brighton: Moulsecoomb ':
			locationsOutput += '<li class="sys_locbrighton">Brighton: Moulsecoomb</li>';
			break;
		case 'Eastbourne':
			locationsOutput += '<li class="sys_loceastbourne">Eastbourne</li>';
			break;
		case 'Hastings':
			locationsOutput += '<li class="sys_lochastings">Hastings</li>';
			break;
		case 'Distance learning':
			locationsOutput += '<li class="sys_locdistance">Distance learning</li>';
			break;
		case 'Partner college':
			locationsOutput += '<li class="sys_locpartner">Partner college</li>';
			break;
		}
	}

	var modes = course.moa.split(",");
	var modesOutput = ''; 
	for (var n=0; n < modes.length; n++) {
		modesOutput += '<li>'+ modes[n] +'</li>';
	}
	if ((course.strapline !== '') && (course.strapline !== undefined)) {
		straplineOutput = '<p class="sys_course-strapline">' + course.strapline + '</p>';
	}
	if (course.level == 'UG') {
		resultOutput = '<li id="courseNode-' + course.nodeId + '" class="sys_level-UG ' + topUpClass + foundationYearClass + '"><a href="'+ course.link +'"><article aria-label="'+ course.title +'"><h2>'+ course.title +'</h2>' + straplineOutput + '<div class="sys_coursedefs"><h3>Location</h3><ul class="sys_definitions">' + locationsOutput + '</ul></div><div class="sys_coursedefs  sys_resultduration"><h3 class="sys_durationhead">Mode of study</h3><ul class="sys_definitions sys_resultduration">' + modesOutput + '</ul></div><div class="sys_coursedefs sys_resultucas"><h3>UCAS code</h3><ul class="sys_definitions sys_resultucas"><li>' + course.ucas + '</li></ul></div></article></a></li>';
	}
	else if (course.level == 'PG') {
		resultOutput = '<li id="courseNode-' + course.nodeId + '" class="sys_level-PG"><a href="'+ course.link +'"><article aria-label="'+ course.title +'"><h2>'+ course.title +'</h2>' + straplineOutput + '<div class="sys_coursedefs"><h3>Location</h3><ul class="sys_definitions">' + locationsOutput + '</ul></div><div class="sys_coursedefs  sys_resultduration"><h3 class="sys_durationhead">Mode of study</h3><ul class="sys_definitions sys_resultduration">' + modesOutput + '</ul></div></article></a></li>';
	}
	else {
		resultOutput = '<li class="sys_level-App"><a href="'+ course.link +'"><article aria-label="'+ course.title +'"><h2>'+ course.title +'</h2>' + straplineOutput + '<div class="sys_coursedefs"><h3>Location</h3><ul class="sys_definitions">' + locationsOutput + '</ul></div><div class="sys_coursedefs  sys_resultduration"><h3 class="sys_durationhead">Mode of study</h3><ul class="sys_definitions sys_resultduration">' + modesOutput + '</ul></div></article></a></li>';
	}
	return resultOutput;
}

// build the overall results ul, take the search results and run the function to create an li for each one then add the ul to the page
function outputSearchResults(matchingCourses, levelToShow, sortByTitle) {
	var sortByTitle = typeof sortByTitle !== 'undefined' ? sortByTitle : false;
	var courseList = $( "<ul/>", { "id": "courselistdynamic" });
	var listOfCourses = [];
	if (sortByTitle) {
		matchingCourses.sort(function(a, b) {
			var textA = a['title'].replace(/[()]/g, '').toLowerCase();
			var textB = b['title'].replace(/[()]/g, '').toLowerCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});	
	}
	$('.sys_courseresults').show();
	if (matchingCourses.length > 0 ) {
		for (var i=0; i < matchingCourses.length; i++) {
			listOfCourses.push(matchingCourses[i]['outputHTML']);
		}
		courseList.html(listOfCourses.join( "" ));
		$('#course-data .sys_course-list-container').empty().append(courseList);
		// display the chosen level of course if not all
		$('.sys_level-NONE').remove();
		if (levelToShow != 'All') {
			if (levelToShow == 'UG') {
				$('.sys_level-PG, .sys_level-App').hide();
				if (!$('.sys_level-UG').length) {
					$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
				}
			}
			else if (levelToShow == 'PG') {
				$('.sys_level-UG, .sys_level-App').hide();
				if (!$('.sys_level-PG').length) {
					$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
				}
			}
			else if (levelToShow == 'App') {
				$('.sys_level-UG, .sys_level-PG').hide();
				if (!$('.sys_level-App').length) {
					$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
				}
			}
			else if (levelToShow == 'FY') {
				$('.sys_level-PG, .sys_level-App').hide();
				$('.sys_level-UG').not('.sys_level-FY').hide();
				if (!$('.sys_level-FY').length) {
					$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this level of study. Please try searching for another term.</p></li>');
				}
			}
			else {
				$('.sys_level-PG, .sys_level-App').hide();
				$('.sys_level-UG').not('.sys_level-Top').hide();
				if (!$('.sys_level-Top').length) {
					$('#courselistdynamic').append('<li class="sys_level-NONE"><p>Your search returned no results for this type of course. Please try searching for another term.</p></li>');
				}
			}
		}
	}
	else {
		$('#course-data .sys_course-list-container').empty().append('<p>Your search returned no results. Please try searching for another term.</p>');
	}
}

function getQueryString (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};

function getHashString() {
	var fullHash = location.hash;
	var queryTerm = '';
	var queryLevel = 'All';
	if (fullHash.indexOf('query=') > -1) {
		queryTerm = fullHash.substring(fullHash.indexOf('query=')+6, fullHash.indexOf('&'));
		queryLevel = fullHash.substring(fullHash.indexOf('&')+7);
	}
	var hashReturn = {searchTerm: queryTerm, searchLevel: queryLevel};
	return hashReturn;
};

function runSearchOnPageLoad(coursesToSearch) {
	var pageHash = getHashString();
	var urlKeyword = '';
	var levelToSearch = 'All';
	var runSearch = false;
	if (pageHash['searchTerm'] != '') {
		urlKeyword = pageHash['searchTerm'];
		levelToSearch = pageHash['searchLevel'];
		runSearch = true;
	}
	else if (getQueryString('keyword')) {
		urlKeyword = getQueryString('keyword');
		levelToSearch = 'All';
		runSearch = true;
	}
	else if (getQueryString('search_keywords')) {
		urlKeyword = getQueryString('search_keywords');
		levelToSearch = 'All';
		runSearch = true;
	}
	else if (pageHash['searchLevel'] != '') {
		// output all courses on page load filtering only by level
		outputSearchResults(coursesToSearch, pageHash['searchLevel'], true); 
		var levelButtons = $('input[name="courselevel"]')
		levelButtons.prop('checked', 'false');
		levelButtons.filter("[value="+pageHash['searchLevel']+"]").prop('checked', true);
	}
	if (runSearch) {
		urlKeyword = decodeURIComponent(urlKeyword.replace(/\+/g, " "));
		var searchResults = searchForTerm(urlKeyword, coursesToSearch);
		outputSearchResults(searchResults, levelToSearch);
		$('#courselistdynamicinput').val(urlKeyword);
		highlightSearchTerms();
		var levelButtons = $('input[name="courselevel"]')
		levelButtons.prop('checked', 'false');
		levelButtons.filter('[value='+levelToSearch+']').prop('checked', true);
		// if on main site search page, update the total number of results
		if ($('#sys_total-results').length) {
			if ($('#courselistdynamic li').length) {
				var courseResults = $('#courselistdynamic > li').length;
				// add the number of course results to its button
				$('.sys_forms-section-tabs a').eq(0).append(' (' + courseResults + ')');
				// check if there were any normal page results - restCount is initialised in search-results-integrated.js
				var generalResults = restCount;
				var resultsTotal = courseResults + generalResults;
				// if there are normal page results and course results
				if (generalResults > 0) {
					var resultsText = $('#sys_total-results').text();
					resultsText = resultsText + " and " + courseResults + " courses.";
					$('#sys_total-results').text(resultsText);
				}
				// if there are course results but no normal page results
				else {
					if (courseResults > 1) { 
						$('#sys_search-results-intro').text("Your search returned " + courseResults + " courses."); 
					}
					// if there is just one course result and no normal page results
					else if (courseResults == 1) { 
						$('#sys_search-results-intro').text("Your search returned " + courseResults + " course."); 
					}
				}
				// show course level filter
				$('.sys_search-filter').show();	
			}
			else {
				$('.sys_forms-section-tabs a').eq(0).append(' (0)');
			}
		}
	}
}

function highlightSearchTerms() {
	if ($('#courselistdynamicinput').length) {
		var searchTermsForHighlighting = $('#courselistdynamicinput').val().trim().split(" ");
		for (var n=0; n < searchTermsForHighlighting.length; n++) {
			var patternForHighlight = new RegExp(searchTermsForHighlighting[n], 'gi');
			$('.sys_course-strapline').each(function() {
				$(this).html($(this).html().replace(patternForHighlight, '<span style="background-color: #ffcc00;">$&</span>'));
			});
		}
	}
}

(function ($) {

	$(function () {

		// URL for live site: $.getJSON("/custom/uob/data/courses", function (data) {
		// URL for local testing: 
		$.getJSON( "uob-api/data/course-data-test.json", function(data) {

			// data has been converted to an array of objects - save to pass through to search functions
			coursesToSearch = data;

				// initiate the search functionality
				enableSearch();
	
		})
			.fail(function (jqXHR, textStatus, errorThrown) {
				// fallback if getJSON fails from first path
				$.getJSON("/uob-api/data/courses.json", function (data) {
					// data has been converted to an array of objects - save to pass through to search functions
					coursesToSearch = data;
					// initiate the search functionality
					enableSearch();
				}).done(function () { console.log('JSON fallback'); })
      		});
      
      

        

		$('#BespokeGenericSearch').append('<p id="loading-graphic">Loading course data...<img src="/_design/img/loader-blocks.gif" alt="Loading course data" style="display: block" /></p>');
		$('#BespokeGenericSearch').parents('.sys_row').first().after('<div class="sys_row"><div class="sys_span12"><div id="course-data"></div></div></div>');

		// create the general results wrapping content
		$('#course-data').empty();
		// different output depending on whether this is the course search page or the main site search page
		if ($('#sys_total-results').length) {
			$('<div/>', {
				'class': 'sys_courseresults'
			}).appendTo('#course-data')
				.append(
				$('<div/>', {
					'class': ''
				})
					.append(
					$('<div/>', {
						'class': 'sys_course-list-container'
					}).append(
						$('<p/>', {
							'text': 'Loading courses...'
						})))
				);
		}
		else {
			$('<div/>', {
				'class': 'sys_section-content sys_courseresults'
			}).appendTo('#course-data')
				.append(
				$('<div/>', {
					'class': 'sys_section-content-tab sys_row'
				})
					.append(
					$('<div/>', {
						'class': 'sys_span12 sys_course-list-container'
					}).append(
						$('<p/>', {
							'text': 'Loading courses...'
						})))
				);
		}
		// fix for Firefox not running scripts accurately after back button is pressed
		window.onunload = function () { };

	});

})(jQuery);