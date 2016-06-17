'use strict';

var $ = require('jquery');
var ig_request_url = '/instagram';


function getIGphotos() {
	var $photoCont = $('.ig-post-list');

	// $.get(ig_request_url)
	$.get({
		url: ig_request_url,
		dataType: 'json'
	}).done(function(data){
			console.log('Recieved IG data:');
			console.log(data);
		})
		.fail(function(err){
			console.log('Error getting IG data:');
			console.log(err);
		});
}

module.exports = getIGphotos();