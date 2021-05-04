// THIS FILE IS CURRENTLY NOT IN USE. ALL SCRIPTS HAVE BEEN COPIED INTO BRIGHTON.JS

//Toggle Areas
		
$('.sys_toggle-trigger').click(function(){
	if (!$(this).hasClass('sys_active-trig')) {
		$(this).addClass('sys_active-trig');
	}	
	else {
		$(this).removeClass('sys_active-trig');
	}
	selTog = $(this).attr('rel');
	// added fix for Contensis stripping out rel tag on mobile search toggle
	if ($(this).hasClass('sys_search-trigger')) { selTog = 'site-search'; }
	$('.sys_' + selTog).addClass('sys_tog').toggle();
	return false;
});

function closeSlideOutNav() {
	$('#top-nav-menu').animate({'margin-left' : '-100%'}, 0), $('.sys_top-nav-fixed #top-nav').animate({'margin-left' : '0'}, 0), $('.sys_mobile-nav-enabled').animate({'margin-left' : '0%'}, 0, function(){$('body').removeClass('sys_mobile-nav-enabled').animate({'margin-left' : '0%'}, 0);});		
}

$('.sys_mobile-nav-trigger').click(function(){	
	
	if(($('body').hasClass('sys_mobile-nav-enabled'))) {
		closeSlideOutNav();
		return false;
	}
	else {
		$('body').addClass('sys_mobile-nav-enabled').animate({'margin-left' : '100%'}, 0);
		$('#top-nav-menu').addClass('sys_overthrow').animate({'margin-left' : '0%'}, 0), $('.sys_mobile-nav-enabled').animate({'margin-left' : '100%'}, 0);		
	return false;		
	}
	
	return false;
});

/* moved to touchevents.js by Simon Parkyn
$(window).touchwipe({
	wipeLeft: function() {
	  closeSlideOutNav();
	},
	preventDefaultEvents: false
  });*/

$(window).bind('ready resize', function(){
	var w = $(window).width();
	if((w > 980) && ($('body').hasClass('sys_mobile-nav-enabled'))) {
		closeSlideOutNav();
	}
});

/*$(window).bind('ready resize', function(){
	var w = $(window).width();
	if(w < 980) {
		$('ul.select-list-ul').each(function(){
			var list = $(this),
			select = $(document.createElement('select')).addClass('select-list-ul-mobile').insertBefore($(this).hide()).change(function(){
			window.location.href=$(this).val();
			});

			$('>li a', this).each(function(){
				var option = $(document.createElement('option'))
				.appendTo(select)
				.val(this.href)
				.html($(this).html());
				
				if($(this).parent('li').attr('class') === 'selected'){
					option.attr('selected','selected');
				}
			});
		
		list.remove();
		});
		
		$('ul.section-tabs').each(function(){
			var list = $(this),
			select = $(document.createElement('select')).addClass('select-list-ul-mobile-tabs').insertBefore($(this).hide()).change(function(){
			window.location.href=$(this).val();
			});

			$('>li a', this).each(function(){
				var optID = $(this).attr('ID');
				var option = $(document.createElement('option'))
				.appendTo(select)
				.attr('ID', optID)
				.val('javascript:returnfalse;')
				.html($(this).html());
				
				if($(this).parent('li').attr('class') === 'selected'){
					option.attr('selected','selected');
				}
			});
		
		list.remove();
		});
	}
	else {
		$('select.select-list-ul-mobile').each(function(){
			var list = $(this);
			select = $(document.createElement('ul')).attr('ID', 'section-menu').addClass('select-list-ul').insertBefore($(this).hide());
			$(this).find('option').each(function(){			
			  if ($(this).attr('selected') == 'selected') {
				$(select).append('<li class="selected"><a href="' + $(this).val() + '">'+$(this).text()+'</a></li>');
			  }
			  else {
				$(select).append('<li><a href="' + $(this).val() + '">'+$(this).text()+'</a></li>');
			  }
			});
			list.remove();
		});

		$('.select-list-ul-mobile-tabs').each(function(){
			var list = $(this);
			select = $(document.createElement('ul')).attr('class', 'section-tabs').insertBefore($(this).hide());
			$(this).find('option').each(function(){			
			  if ($(this).attr('selected') == 'selected') {
				$(select).append('<li class="selected"><a href="#" id="'+ $(this).attr('id') +'">'+$(this).text()+'</a></li>');
			  }
			  else {
				$(select).append('<li><a href="#" id="'+ $(this).attr('id') +'">'+$(this).text()+'</a></li>');
			  }
			});
			list.remove();
		});	
	}
		
});*/
/*document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });*/

/*$('#course-nav').click(function(){
	var w = $(window).width();
	var h = $('#course-nav-menu').height();
	
	if ((w < 980) && (h == 0)) {
		$('#course-nav-menu').animate({'height' : '100%'}, 500).addClass('sys_selected-down');
	}
	else if ((w < 980) && (h > 0)) {
		$('#course-nav-menu').animate({'height' : '0'}, 100).removeClass('sys_selected-down');
	}
});	*/

/* #Sigchange# */

if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}
