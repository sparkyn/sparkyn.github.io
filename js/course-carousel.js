(function($) {

$(function() {
  
if ($('.courseCarousel').length) {

  	$('.courseCarousel').jcarousel({
    	wrap: 'circular'
	});
		
	$('.courseCarousel-prev').click(function(e) {
		$(this).parent('.courseCarousel').jcarousel('scroll', '-=1');
		e.preventDefault();
	});
		
	$('.courseCarousel-next').click(function(e) {
		$(this).parent('.courseCarousel').jcarousel('scroll', '+=1');
		e.preventDefault();
	});
				
}
else {
				
	$('.courseCarousel-prev').hide();
	$('.courseCarousel-next').hide();
				
}
    
});

})(jQuery);