$(document).ready(function() {

	mapDrawn = false;
	$('#location .sys_toggle-section-mobile').click(function() {
		if (!(mapDrawn)) {
			$('#map_canvas')
				.width('100%')
				.height(425);
			$('#map_key').css('display', 'table');
			initialize();
		
			map.setCenter(UoB.Falmer);map.setZoom(14);
			mapDrawn = true;
		}
	
	});
	
});


