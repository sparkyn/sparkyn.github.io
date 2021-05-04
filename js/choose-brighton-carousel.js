(function($) {

    $(function() {
    
    // choose brighton number pins 
    if ($(":header.heading-pin, .sys_heading-pin-auto :header").length) {
        $(":header.heading-pin, .sys_heading-pin-auto :header").each(function(i) {
            var j =  i + 1;
            $(this).prepend('<span class="sys_heading-pin"></span><span class="sys_pin-num">'+j+'</span> ');
        });
    }
    
    $('.sys_panel-image-carousel').slick({
                dots: true,
                dotsClass: 'sys_slick-dots slick-dots',
                infinite: true,
                arrows: true,
                lazyLoad: 'ondemand',
                nextArrow: '<a class="carousel-control-next imageCarousel-next" href="#" title="Next"></a>',
                prevArrow: '<a class="carousel-control-prev imageCarousel-prev" href="#" title="Previous"></a>',
                slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
                responsive: [
                {
                    breakpoint: 990,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                adaptiveHeight: true
                    }
                    },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                adaptiveHeight: true
                    }
                    }
                ]
              });
    
        
    }); //close $(function() {
    })(jQuery); 