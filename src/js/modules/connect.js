'use strict';

var $ = require('jquery');
var ig_request_url = '/instagram';


function getIGphotos() {
	var $photoCont = $('.ig-post-list');

	// $.get(ig_request_url)
	$.ajax({
		type: 'GET',
		url: ig_request_url,
		dataType: 'json'
	}).done(function(data){
			// console.log('Recieved IG data:');
			// console.log(data);

			data.data.forEach(function(post, i){
				var $imgLink = $('<a href="' + post.link + '" target="_blank" class="ig-link"></a>')
				var imgHTML = '<img src="' + post.images.standard_resolution.url + '">';
				var locationHTML = '<h4 class="location">' + post.location.name + '</h4>';
				var captionHTML = '<h4 class="caption">' + post.caption.text + '</h4>';

				// Create HTML
				$imgLink.html(imgHTML + locationHTML + captionHTML);

				// Add to page
				$photoCont.append($imgLink);
			});
		})
		.fail(function(err){
			console.log('Error getting IG data:');
			console.log(err);
		});
}

module.exports = getIGphotos();