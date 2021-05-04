function processPopUpData(popUpData) {
    if ((popUpData != null) && (popUpData.title)) {

        var popUpsShown = getCookie("uobpopups");
        var popUpId = popUpData.sys.id;

        // if pop up has previously been shown, do nothing
        if ((popUpsShown) && (popUpsShown.indexOf(popUpId) !== -1)) {
           
        }
        else {
            var title = popUpData.title;
            var internalTitle = popUpData.internalTitle
            var content = popUpData.content;
            var linkText = popUpData.linkText;
            var link = popUpData.link; 

            // build and append pop up to body element
            $('<div/>', {
                'id': 'pop-up-alert',
                'class': 'sys_site-pop-up'
            }).appendTo('body')
                .append(
                    $('<div/>', {
                        'class': 'sys_site-pop-up-inner',
                        'id': 'pop-up-alert-inner'
                    }).append(
                        $('<h2/>', {
                            'text': title
                        })
                    )
                    .append(
                        $.parseHTML(content)
                    )
                    .append(
                        $('<img />', {
                            'class': 'sys_close-pop-up',
                            'src': 'img/close-24px.gif',
                            'alt': 'Close'
                        })
                    )
                )
                .animate({right: "0px"}, 900);
            
            if((linkText != "") && (link != "")) {
                $('#pop-up-alert-inner').append(
                    $('<a/>', {
                        'class': 'sys_pop-up-button',
                        'text': linkText,
                        'href': link
                    })
                );
                // fire analytics event, but only if analytics has loaded (i.e. consent received) 
                $('.sys_pop-up-button').click(function() {
                    if (analyticsLoaded()) {
                        ga('send', 'event', 'Popups', 'Pop-up CTA clicked', internalTitle);
                        console.log('CTA clicked - ' + internalTitle);
                    }
                });
            }

            function closePopUp() {
                $('#pop-up-alert').hide();
                // if a unibuddy popcard is present, hide it
                if ($('#unibuddy-popcard-iframe').length) { 
                    $('#unibuddy-popcard-iframe').hide() 
                }
                // fire analytics event, but only if analytics has loaded (i.e. consent received) 
                if (analyticsLoaded()) {
                    ga('send', 'event', 'Popups', 'Pop-up closed', internalTitle);
                    console.log('Closed - ' + internalTitle);
                }
            }

            // add behaviour to close pop up
            $('.sys_close-pop-up, #pop-up-alert').click(function(e) {
                e.preventDefault();
                closePopUp();
            });
            $('#pop-up-alert-inner').click(function(e){
                e.stopPropagation();
            });

            // if other pop ups already shown, set a session cookie to store that this pop up has been shown as well
            if (popUpsShown) {
                setSessionCookie("uobpopups", popUpsShown + "+" + popUpId);
            }
            else {
                // first pop up shown, set a session cookie to store that just this pop up has been shown
                setSessionCookie("uobpopups", popUpId);
            }

            // fire analytics event, but only if analytics has loaded (i.e. consent received) 
            if (analyticsLoaded()) {
                ga('send', 'event', 'Popups', 'Pop-up shown', internalTitle);
                console.log('Shown - ' + internalTitle);
            }

        }

    }
}

function setSessionCookie(name,value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function analyticsLoaded() {
    if(window.ga && ga.loaded) {
        return true;
    }
    else {
        return false;
    }
}

(function ($) {

	$(function () {

		// URL for live site: $.getJSON("/_design/razorviews/pop-ups/pop-up-controller.cshtml", function (data) {
		// URL for local testing: 
		$.getJSON( "uob-api/data/popUpMessage.json", function(data) {

            processPopUpData(data);
	
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			console.log('Failed to get pop-up JSON'); 
      	});
      

	});

})(jQuery);