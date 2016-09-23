'use strict';

var $ = require('jquery');
var ig_request_url = '/instagram-data';


function getIGphotos() {
	var $photoCont = $('.ig-post-list');

	// $.get(ig_request_url)
	$.ajax({
		type: 'GET',
		url: ig_request_url,
		dataType: 'json'
	}).done(function(data){
			console.log('Recieved IG data:');
			console.log(data);

			// Remove placeholder photos
			$photoCont.empty();

			data.data.forEach(function(post, i){

				// Get lower resolution image for mobile views
				var imgUrl = (window.innerWidth < 768) ? post.images.low_resolution.url : post.images.standard_resolution.url

				var $imgLink = $('<a href="' + post.link + '" target="_blank" class="ig-link"></a>')
				var imgHTML = '<img src="' + imgUrl + '">';
				var locationHTML = (post.location) ? '<h4 class="location">' + post.location.name + '</h4>' : '';
				var captionHTML = (post.caption) ? '<h4 class="caption">' + post.caption.text + '</h4>' : '';

				// Create HTML
				$imgLink.html(imgHTML + captionHTML + locationHTML);

				// Add to page
				$photoCont.append($imgLink);

				// console.log('Added '+ post.location.name + ' to page');
			});
		})
		.fail(function(err){
			console.log('Error getting IG data:');
			console.log(err);
		});
}

module.exports = getIGphotos;