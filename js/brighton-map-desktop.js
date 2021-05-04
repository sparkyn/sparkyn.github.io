$(document).ready(function() {

	mapDrawn = false;
	$('#Interactive-tours-and-maps').click(function() {
		if (!(mapDrawn)) {
			$('#map_canvas')
				.width(688)
				.height(425);
			$('#map_key').css('display', 'table');
			initialize();
		
			map.setCenter(UoB.Falmer);map.setZoom(14);
			mapDrawn = true;
		}
	
	});
	
});


