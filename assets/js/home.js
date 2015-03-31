/* jshint strict: true */
/* jslint vars: true */

$(document).ready(function(){

	"use strict";

	// Grab content for homepage.
	$.get( "/data/home.json", function(data) {

		// Populate presentation content.
	  var presentations = Mustache.render($('#presentation-list-item').html(), data);
	  $('#presentation-list').html(presentations);

		// Populate social content.
	  var social = Mustache.render($('#social-icon').html(), data);
	  $('#social-icons').html(social);

	  for (var i=0; i<5; i++)
	  {
	  	console.log('ok');
	  }

	});

});