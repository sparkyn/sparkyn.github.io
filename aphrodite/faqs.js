(function($) {
$(function() {

$('.faq-question').click(function(e) {
    e.preventDefault();

    targetAnswer = $(this).attr('aria-controls');

    ariaExpandedValue = $(this).attr('aria-expanded');
    newAriaExp = (ariaExpandedValue == "false") ? "true" : "false";
    $(this).attr('aria-expanded', newAriaExp);

    isTargetAnswerHidden = $('#' + targetAnswer).attr('aria-hidden');
    if (isTargetAnswerHidden == "true") {
        $('#' + targetAnswer).attr('aria-hidden', "false");
        $('#' + targetAnswer).slideDown();
        $(this).addClass('open');
    }
    else {
        $('#' + targetAnswer).attr('aria-hidden', "true");
        $('#' + targetAnswer).slideUp();
        $(this).removeClass('open');
    }
});
    
}); 
})(jQuery); 