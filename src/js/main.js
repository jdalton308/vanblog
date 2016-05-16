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


});