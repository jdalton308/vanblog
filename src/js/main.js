$(function(){

	var $body = $('body');

	var Landing = (function(){
		var $landing = $('.landing');
		var $downBtn = $('.down-button');
		var $upBtn = $('.up-button');

		function init() {
			$downBtn.click(function(){
				$body.addClass('scroll');
			});
			$upBtn.click(function(){
				$body.removeClass('scroll');
			});
		}
		return {
			init: init
		};
	})();

	Landing.init();


	var Nav = (function(){
		var $nav = $('.side-nav');
		var $mobileBtn = $('.mobile-nav-btn');
		var $mobileUpBtn = $('.mobile-up-button');

		function init() {
			$mobileBtn.click(function(){
				$nav.addClass('open');
			});
			$mobileUpBtn.click(function(ev){
				ev.stopPropagation();
				$nav.removeClass('open');
			});
		}
		return {
			init: init
		};
	})();

	Nav.init()

});