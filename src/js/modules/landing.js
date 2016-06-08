
var $ = require('jquery');


var $body = $('body');
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


module.exports = init;