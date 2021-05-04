$(document).ready(function() {
			
	/* calls the function that controls the filtered table */
	/* options and documentation at http://datatables.net/ */
	$('#countrylistdynamic').dataTable( {
		"bPaginate": false,
		"bLengthChange": false,
		"bSort": false,
		"bInfo": false,
		"bAutoWidth": false ,
		 "oLanguage": {
		  "sInfo": "",
		   //"sInfo": "We have _TOTAL_ courses available that match your search term (result page _START_ to _END_)",
		  "sSearch": "Type your country here:",
		  "sInfoFiltered": ""
		}
	});
	
	/* additional control added by Simon
	/* hides the table until there are at least 2 characters in the search field */
	$("#countrylistdynamic_filter input").keyup(function() {
		var inputLength = $(this).val().length;
		if ( inputLength > 1 ) {
			$('#countrylistdynamic tr').show();
			/* hide any results beyond a given number */
			$('#countrylistdynamic tr:gt(5)').hide();	
		}
		else {
			$('#countrylistdynamic tr').hide();
		}
	});
	
	
	

});