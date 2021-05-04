
    $(document).ready(function(){
		function changeAccessibility(stylesheet){
            document.cookie = "UOB-Accessibility-CSS"+ "=" + stylesheet + ";path=/";
        	$('#accessStyle').remove();
        	if(stylesheet !== ""){
        		$('head').append('<link id="accessStyle" href="' + stylesheet + '" rel="stylesheet" type="text/css" />');
        	}
        }
        
        $('.stylechange1').click(function(e){e.preventDefault();changeAccessibility("css/910-high-contrast.css"); });
        $('.stylechange2').click(function(e){e.preventDefault();changeAccessibility("css/910-low-contrast.css");});
        $('.stylechange3').click(function(e){e.preventDefault();changeAccessibility("");});

	});
