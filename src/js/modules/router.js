
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');
var pathRef = require('../server/server-path-ref.js');


var $pageContainer = $('main');


function getPage(path) {

	var realPath = pathRef[path];

	// Get new file
	return $.get(realPath).then(
		// success
		function(response) {
			// Inset HTML into page
			var $nextPage = $('<div class="main-scroll next-page"><div class="main-wrapper"></div></div>');
			$nextPage.children('.main-wrapper').html(response);
			$pageContainer.append($nextPage);

			// Wait 1 second, then remove old page and reset for next load
			window.setTimeout(function(){
				$pageContainer.find('.main-scroll:not(.next-page)').remove();
				$nextPage.removeClass('next-page');
			}, 1000);
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
			window.history.pushState('', path, path); // state object, title, path
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