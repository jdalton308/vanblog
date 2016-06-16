
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');
var maps = require('./maps.js');
var pathRef = require('../server/server-path-ref.js');


var $pageContainer = $('main');


function getPage(path) {

	var realPath = pathRef[path];

	// console.log('Request made');
	// console.log('URL: '+ path);
	// console.log('File Path: '+ realPath);

	// Get new file
	return $.get(realPath).then(
		// success
		function(response) {
			// Inset HTML into page
			var $nextPage = $('<div class="main-scroll next-page"><div class="main-wrapper"></div></div>');
			$nextPage.children('.main-wrapper').html(response);
			$pageContainer.append($nextPage);

			// Re-run link-binding
			init();

			if (path == '/route') {
				maps();
			}

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

	// get new page
	getPage(path).then(function(){
		window.history.pushState('', path, path); // state object, title, path
	});
}

function checkInitialLoad() {
	var currentPath = window.location.pathname;
	if (currentPath !== '/' && currentPath !== '/home') {
		// If home, then move page down
		$('body').addClass('scroll');
	}
}

function init() {
	var $internalLinks = $('a').filter(function(i){
		return this.hostname === window.location.hostname;
	});
	var $window = $(window);

	console.log('Internal links:');
	console.log($internalLinks);

	$internalLinks.off('click');
	$internalLinks.click(function(e){
		e.preventDefault();
		var targetPath = $(this).attr('href');
		loadTarget(targetPath);
	});

	$window.off('popstate');
	$window.on('popstate', function(e){

		var location = window.location.pathname;
		loadTarget(location);
	});

	checkInitialLoad();
}

module.exports = init;