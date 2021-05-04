(function($) {

$(function() {

if ($('#freePanelSection').length) {
    freePanelHeading = $('#freePanelSection').find('h2').html().replace(/&nbsp;/gi,'');
	freePanelLI = '<li style="max-width: 105px;"><a href="#freePanelSection">' + freePanelHeading + '</a></li>';
    if ($('#freePanelHolderArts').length) {
        $('#course-nav-menu li').eq(3).before(freePanelLI)
    }
    else {
		$('#lastitem').before(freePanelLI);
    }
}
	
});

})(jQuery);
