
var $ = require('jquery');


var $body = $('body');
var $landing = $('.landing');
var $landingImg = $landing.find('.landing-image');
var $downBtn = $('.down-button');
var $upBtn = $('.up-button');

function createBird(e) {
	console.log('Event:');
	console.log(e);

	var xpos = e.clientX;
	var ypos = e.clientY;

	var $bird = $('<div class="bird-holder"><div class="bird"><div class="wing left"></div><div class="wing right"></div></div></div>');

	$bird.css({
		left: xpos,
		top: ypos
	});

	$landingImg.append($bird);
}


function init() {
	$downBtn.click(function(){
		$body.addClass('scroll');
	});
	$upBtn.click(function(){
		$body.removeClass('scroll');
	});

	$landingImg.click(createBird);
}


module.exports = init;