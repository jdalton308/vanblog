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

	return postHTML;
}

function renderCat(path){
	// console.log('renderCat() called');

	let category = path.replace('/cat/', '');
	// console.log('category: '+ category);

	// Get template for post summary
	let templateHTML = fs.readFileSync(postTemplatePath, 'utf8');

	// Create HTML from template and postRef
	let pageHTML = '<h1>'+ category + ' Posts</h1>';
	let postsHTML = ''; // Doing this to check later if no posts were found

	// - Loop through posts, and create HTML
	for (let i = 0; i < postRef.length; i++) {

		let post = postRef[i];
		let postCategories = post.categories;

		// Check category of post, unless getting "All" or "Latest"
		if (postCategories.indexOf(category) != -1 || category === 'All' || category === 'Latest') {

			let postHTML = createPostHTML(post, templateHTML);
			postsHTML += postHTML;
		}

		// On "Latest" category, only show 6 posts
		if (i === 6 && category === 'Latest') {
			break;
		}
	}

	// If no posts found, show a message...
	if ( postsHTML === '' ) {
		postsHTML = '<h4>No posts here yet. Check back soon.</h4>';
	}

	pageHTML += postsHTML;

	// Return HTML block
	return pageHTML;
}


module.exports.renderCat = renderCat