/** Helper to make the terms searched for appear in the search if we use a textbox redirect instead of the query control
@author: Gareth **/
//improved URL decodeComponent (deals with spaces encoded as '+')
function urldecode(str) { return decodeURIComponent((str+'').replace(/\+/g, '%20')); }
//look in the URL for a 'search_keywords' query parameter
var match = /[?&]search_keywords=([^&]+)/i.exec(document.URL);
//if found then decode and update the seach box (use jQuery to escape)
if (match != null) jQuery('#SearchOurSite_redirectTextBox').val(urldecode(match[1]));