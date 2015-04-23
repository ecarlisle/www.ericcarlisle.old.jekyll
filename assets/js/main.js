/* jshint strict: true */
/* jslint vars: true */
"use strict";

$(document).ready(function(){

	$('#site-nav-icon').on('click',function(){
		if (!$('#site-nav-mobile').is(':visible')) {
			$('#site-nav-mobile').slideDown();
		} else {
			$('#site-nav-mobile').slideUp();
		}
	});

	$(window).resize(function(){
		if ($(this).width() < 768 && $('#site-nav-mobile').is(':visible')) {
			$('#site-nav-mobile').hide();
		}
	});
});
