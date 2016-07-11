
var $ = require('jquery');

var isMobile = (window.innerWidth < 768);

var $nav = $('.side-nav');
var $navItems = $('.nav-item');
var $parentItem = $navItems.filter('.nav-parent');

var $mobileBtn = $('.mobile-nav-btn');
var $mobileUpBtn = $('.mobile-up-button');


function init() {

	// Handle hamburger toggling
	$mobileBtn.click(function(){
		$nav.addClass('open');
	});
	$mobileUpBtn.click(function(ev){
		ev.stopPropagation();
		$nav.removeClass('open');
	});

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


module.exports = init;