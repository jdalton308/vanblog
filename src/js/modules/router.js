
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');


// State variables
var oldHash = '/';

// Elements
var $pageContainer = $('.main-wrapper');
// var $loader = $('.main-loader');


function getPage(target) {
	var filePath = '/pages/' + target + ".html";

	// 2. Get new file
	return $.get(filePath).then(
		// success
		function(response) {
			// 3. inset HTML into page
			$pageContainer.html(response);
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
	var newHash = window.location.hash.substr(2) || 'latest';

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