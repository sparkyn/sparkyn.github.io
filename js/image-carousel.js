(function($) {

$(function() {
  
if ($('.imageCarousel').length) {

  	$('.imageCarousel').jcarousel({
    	wrap: 'circular'
	});
		
	$('.imageCarousel-prev').click(function(e) {
		$(this).parent('.imageCarousel').jcarousel('scroll', '-=1');
		e.preventDefault();
	});
		
	$('.imageCarousel-next').click(function(e) {
		$(this).parent('.imageCarousel').jcarousel('scroll', '+=1');
		e.preventDefault();
	});
				
}
else {
				
	$('.imageCarousel-prev').hide();
	$('.imageCarousel-next').hide();
				
}

// only enable lightbox on >IE8 and devices bigger than a mobile
if (($('#page-wrapper').hasClass('sys_lt-ie9')) || ($(window).width() < 480)) {
  $('a.carousel-lightbox').click(function(e) {
		e.preventDefault();
	}).css('cursor', 'default');
}  
else {
	$('a.carousel-lightbox').fancybox({
		openEffect		:	'none',
		closeEffect		:  	'none',
		nextEffect		:	'fade',
  		prevEffect		: 	'fade',
  		loop			: 	true,
  		wrapCSS 		: 	'imageCarousel-lightbox',
  		helpers:  {
        	overlay : {
              css 	: { 'background': 'rgba(34, 34, 34, 0.7)', 'background-image' : 'none' }
        	},
            title	: {
              type : 'over'           
            }
    	}
	});
}
  
  
});

})(jQuery);