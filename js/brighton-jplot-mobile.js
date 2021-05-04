$(document).ready(function() {


alreadyDrawnCareersDonut = false; 
$("#careers .sys_toggle-section-mobile").click(function() {

	if ( ($("#careers .sys_jqplotDonut").is(":visible")) && (!(alreadyDrawnCareersDonut)) ) {
		
		careersDonut = $('#careers .sys_jqplotDonut');
		
		careersDonut.attr('id', 'careersDonut');
		
		drawDonut('careersDonut');
		
		careersDonut.children('table.sys_donutValues').hide();
		alreadyDrawnCareersDonut = true;
	}

});

alreadyDrawnFeesDonut = false; 
$("#fees .sys_toggle-section-mobile").click(function() {

	if ( ($("#fees .sys_jqplotDonut").is(":visible")) && (!(alreadyDrawnFeesDonut)) ) {
		
		feesDonut = $('#fees .sys_jqplotDonut');
		
		feesDonut.attr('id', 'feesDonut');
		
		drawDonut('feesDonut');
		
		feesDonut.children('table.sys_donutValues').hide();
		alreadyDrawnFeesDonut = true;
	}

});
	
});


