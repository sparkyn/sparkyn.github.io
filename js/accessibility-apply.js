// NB - THIS CODE HAS BEEN INSERTED INTO THE PAGE TEMPLATES AS CUSTOM CODE. ACCESSIBILITY-APPLY.JS AS A SEPARATE FILE IS NOT IN USE ON THE SITE
// THE CODE USED TO INSERT IT IS AS FOLLOWS:
/*
'Insert script for accessibility cookie
ContensisHeader.Text += environment.newline & "<scr" & "ipt type=""text/javascript"">" & environment.newline
ContensisHeader.Text += "var cssContrast = document.cookie.replace(/(?:(?:^|.*;\s*)UOB-Accessibility-CSS\s*\=\s*([^;]*).*$)|^.*$/, ""$1"");" & environment.newline
ContensisHeader.Text += "if(cssContrast !== """"){ var newLink = document.createElement(""link""); newLink.href = cssContrast; newLink.setAttribute('rel', 'stylesheet'); newLink.setAttribute('type', 'text/css'); newLink.setAttribute('id', 'accessStyle'); document.head.appendChild(newLink); }" & environment.newline
ContensisHeader.Text += "</scr" & "ipt>" & environment.newline
// END OF CUSTOM CODE BLOCK */

var cssContrast = document.cookie.replace(/(?:(?:^|.*;\s*)UOB-Accessibility-CSS\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if(cssContrast !== ""){
	/*var headHTML = document.getElementsByTagName('head')[0].innerHTML;
	headHTML	+= '<link id="accessStyle" href="' + cssContrast + '" rel="stylesheet" type="text/css" />';
	document.getElementsByTagName('head')[0].innerHTML = headHTML;*/
	var newLink = document.createElement("link");
	newLink.href = cssContrast;
	newLink.setAttribute('rel', 'stylesheet');
	newLink.setAttribute('type', 'text/css');
	newLink.setAttribute('id', 'accessStyle');
	document.head.appendChild(newLink);
}



