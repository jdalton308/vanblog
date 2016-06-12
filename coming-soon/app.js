
var $body = $('body');
var $landing = $('.landing');
var $landingImg = $landing.find('.landing-image');


function createBird(e) {
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
	$landingImg.click(createBird);
}


$(function(){
	init();
});