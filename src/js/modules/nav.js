
var $ = require('jquery');

var isMobile = (window.innerWidth < 768);

var $nav = $('.side-nav');
var $navItems = $('.nav-item');
var $parentItem = $navItems.filter('.nav-parent');

var $mobileBtn = $('.mobile-nav-btn');
var $mobileUpBtn = $('.mobile-up-button');

function bindHamburgerEvents() {
	// Handle hamburger toggling
	$mobileBtn.click(function(){
		$nav.addClass('open');
	});
	$mobileUpBtn.click(function(ev){
		ev.stopPropagation();
		$nav.removeClass('open');
	});
}

function bindNavItemEvents() {
	// Handle secondary-levels
	if (!isMobile) {
		$parentItem.click(function(){
			$(this).toggleClass('open');
		});
	}
	if (isMobile) {
		$navItems.click(function(){
			// console.log('removing open class...');
			$nav.removeClass('open');
		});
	}
}

function bindHashLinkEvents() {
	console.log('binding hash nav...');

	var $page = $('.main-scroll');
	var $pageNavLink = $('a[href^="#"]');
	
	if ($pageNavLink.length) {
		console.log('found hash links...');
		console.log($pageNavLink);

		$pageNavLink.click(function(e){
			console.log('--click!')
			e.preventDefault();

			var target = $(this).attr('href');
			var targetEl = $(target);
			var offset = targetEl.offset().top;

			$page.animate({
				scrollTop: offset
			}, 800);

		});
	}
}

function init() {
	bindHamburgerEvents();
	bindNavItemEvents();
}


module.exports.init = init;
module.exports.bindHashes = bindHashLinkEvents;