'use strict';

const postRef = require('./server-post-ref.js');
const fs = require('fs');

const postTemplatePath = './posts/summary-post.template.html';


function createPostHTML(postObj, template) {
	let postHTML = template;

	// Parse template
	for (let postPropKey in postObj) {
		let postPropVal = postObj[postPropKey];
		postHTML = postHTML.replace('{{'+ postPropKey + '}}', postPropVal);
	}
}

function renderCat(path){

	let category = path.replace('/cat/', '');

	// Get template for post summary
	let templateHTML = fs.readFileSync(postTemplatePath, 'utf8');

	// Create HTML from template and postRef
	let pageHTML = '<h1>'+ category + ' Posts</h1>';

	// - Loop through posts, and create HTML
	for (let i = 0; i < postRef.length; i++) {
	// for (let post of postRef) {
		let post = postRef[i];
		let postCategories = post.categories;

		if (postCategories.indexOf(category) != -1 || category === 'All' || category === 'Latest') {
			let postHTML = createPostHTML(post, templateHTML);
			
			pageHTML += postHTML;
		}

		if (i === 6 && category === 'Latest') {
			break;
		}
	}

	// Return HTML block
	return pageHTML;
}


module.exports.renderCat = renderCat