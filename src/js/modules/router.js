
// Router
// ------------------------
// - Watches for URL hash changes, then loads pages through AJAX

var $ = require('jquery');

var pathRef = require('../server/server-path-ref.js');
var maps = require('./maps.js');
var connect = require('./connect.js');
var instagram = require('./instagram-feed.js');
var nav = require('./nav.js');

var isMobile = (window.innerWidth < 768);

var $window = $(window);
var $pageContainer = $('main');
var $body = $('body');

// Check for unique pages
function checkPath(path) {
	switch (path) {
		case '/route':
			maps();
			break;
		case '/connect': 
			connect();
			break;
		case '/instagram':
			instagram();
			break;
	}
}


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

			// Check to init unique pages
			checkPath(path);

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
		$body.addClass('scroll');

		if (isMobile) {
			$body.animate({
				scrollTop: window.innerHeight
			}, 1000);
		}
	}

	// Check to init unique pages
	checkPath(currentPath);
}

function init() {

	// Bind internal scroll-to links
	nav.bindHashes();

	var $internalLinks = $('a').filter(function(i){
			return (this.hash === '') && (this.hostname === window.location.hostname);
	});
	// console.log('InternalLinks: %o', $internalLinks);


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