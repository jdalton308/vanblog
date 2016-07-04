'use strict';

var $ = require('jquery');
var ig_request_url = '/instagram';


function getIGphotos() {
	var $photoCont = $('.ig-post-list');

	// $.get(ig_request_url)
	$.ajax({
		type: 'GET',
		url: ig_request_url,
		dataType: 'json'
	}).done(function(data){
			// console.log('Recieved IG data:');
			// console.log(data);

			// Remove placeholder photos
			$photoCont.empty();

			data.data.forEach(function(post, i){

				// Get lower resolution image for mobile views
				var imgUrl = (window.innerWidth < 768) ? post.images.low_resolution.url : post.images.standard_resolution.url

				var $imgLink = $('<a href="' + post.link + '" target="_blank" class="ig-link"></a>')
				var imgHTML = '<img src="' + imgUrl + '">';
				var locationHTML = '<h4 class="location">' + post.location.name + '</h4>';
				var captionHTML = '<h4 class="caption">' + post.caption.text + '</h4>';

				// Create HTML
				$imgLink.html(imgHTML + captionHTML + locationHTML);

				// Add to page
				$photoCont.append($imgLink);

				// console.log('Added '+ post.location.name + ' to page');
			});
		})
		.fail(function(err){
			console.log('Error getting IG data:');
			console.log(err);
		});
}


function watchForm() {
	var $form = $('form.validate');
	var $inputs = $form.find('input').not('.hidden');;
	var $submit = $form.find('button');
	var $message = $form.find('.form-messaging');

	console.log('$inputs:');
	console.log($inputs);

	// Bind events
	function formEvents() {
		$inputs.on('blur', function(e) {
			var $this = $(this);
			if (!$this.hasClass('touched')) {
				$this.addClass('touched');
				validateField($this);
			}
		});
		$inputs.on('keyup', function(e) {
			var $this = $(this);
			if ( $this.hasClass('touched') ) {
				validateField($this);
			}
		});
		$form.on('submit', function(e) {
			$message.addClass('show');
		});
	}


	// Validate fields
	// - After blur, watch each keystroke
	// - Every field validation, validate form, IF all fields have been touched
	// - When form valid, enable submit button
	function validateField($input) {
		var value = $input.val();
		var isEmail = ($input.attr('type') === 'email');

		var emailRegEx = /@/;
		var nameRegEx = /^[a-z '-]+$/i;
		var testEx = (isEmail) ? emailRegEx : nameRegEx;

		var isValid = testEx.test(value);

		$input.toggleClass('valid', isValid);
		validateForm();
	}

	function validateForm() {

		// Assume is true until shown it's not
		var formIsValid = true;

		// Check each input
		for (var i = 0; i < $inputs.length; i++) {
			var $field = $inputs.eq(i);
			var fieldIsValid = ( $field.hasClass('touched') && $field.hasClass('valid') );

			if (fieldIsValid) {
				continue;
			} else {
				formIsValid = false;
				break;
			}
		}

		console.log('Form valid: '+ formIsValid);

		$submit.prop('disabled', !formIsValid);
	}

	// Call event-binding
	formEvents();

}
function init() {
	getIGphotos();
	watchForm();
}

module.exports = init;