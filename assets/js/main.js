/* jshint strict: true */
/* jslint vars: true */

$(document).ready(function(){

	"use strict";

	$('#nav-menu').on('click',function(){
		if (!$('nav').is(':visible')) {
			$('nav').slideDown();
		} else {
			$('nav').slideUp();
		}
	});

	$(window).resize(function(){
		if ($(this).width() >= 768 && !$('nav').is(':visible')) {
			$('nav').show();
		} else if ($(this).width() < 768 && $('nav').is(':visible')) {
			$('nav').hide();
		}
	});
});