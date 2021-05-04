$(document).ready(function() {

if ($('section .sys_jqplotDonut').length) {
	
	donutCounter = 0;
	
	$("section .sys_jqplotDonut").each(function() {
		
		thisDonutID = "donutPlot" + donutCounter; 
		$(this).attr('id', thisDonutID);
		
		thisDonutTitle = $(this).children('h3');
		
		drawDonut(thisDonutID);
		
		$(this).children('table.sys_donutValues').hide();
		
		
		donutCounter++;
	});
	
	
}


	
});


