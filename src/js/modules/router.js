
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');


// State variables
var oldHash = '/';

// Elements
var $pageContainer = $('.main-wrapper');
var $loader = $('.main-loader');


function getPage(target) {
	var filePath = '/pages/' + target + ".html";

	console.log('File Path: '+ filePath);

	// 1. Show loader
	$loader.addClass('show');
	var pageLoaded = false;
	var loaderInterval = window.setInterval(function(){
		if (pageLoaded) {
			window.clearInterval(loaderInterval);
			$loader.removeClass('show');
		}
	}, 1300);

	// 2. Get new file
	return $.get(filePath).then(
		// success
		function(response) {
			// 3. inset HTML into page
			$pageContainer.html(response);

			// hide loader
			pageLoaded = true;
		},
		// error
		function(error) {
			// Show 404 page?
			console.error(error);

			getPage('404');
		}
	);
}

function readHash() {
	// Interpret hash
	var newHash = window.location.hash.substr(2) || '/latest';

	console.log('newHash: '+ newHash);

	// If new...
	if (newHash != oldHash) {
		// get new page
		getPage(newHash);
	
		// set oldHash
		oldHash = newHash;
	}
}

function init() {
	window.addEventListener("hashchange", function(e) {
		e.preventDefault();
		readHash();
	});

	readHash();
}

module.exports = init;