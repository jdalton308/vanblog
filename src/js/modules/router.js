
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');
var pathRef = require('../server/server-path-ref.js');

var $pageContainer = $('.main-wrapper');


function getPage(path) {

	var realPath = pathRef[path];

	// Get new file
	return $.get(realPath).then(
		// success
		function(response) {
			// Inset HTML into page
			$pageContainer.html(response);
		},
		// error
		function(error) {
			// Show 404 page?
			console.error(error);

			getPage('/404');
		}
	);
}

function loadTarget(path) {

	// If new...
	if (path != window.location.pathname) {

		// get new page
		getPage(path).then(function(){
			// set new URL // pushHistory()?
			// window.location.pathname = path;
			window.history.pushState('', path, path);
		});
	}
}

function init() {
	var $internalLinks = $('a[href!="www"]');

	$internalLinks.click(function(e){
		e.preventDefault();
		var targetPath = $(this).attr('href');
		loadTarget(targetPath);
	});

	window.onpopstate - function(e){
		var location = window.location.pathname;
		loadTarget(location);
	};
}

module.exports = init;