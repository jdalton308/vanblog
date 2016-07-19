'use strict';

const postRef = require('./server-post-ref.js');
const pathRef = require('./server-path-ref.js');
const fs = require('fs');

const postTemplatePath = './posts/summary-post.template.html';
const homepagePath = './index.html';


function createPostHTML(postObj, template) {
	let postHTML = template;

	// Parse template
	for (let postPropKey in postObj) {
		let postPropVal = postObj[postPropKey];
		postHTML = postHTML.replace('{{'+ postPropKey + '}}', postPropVal);
	}

	return postHTML;
}

// URL = '/cat/...'
function isSummaryRequest(path) {
	let catRegEx = /\/cat\//i;
	return catRegEx.test(path);
}

// Build post-summary page
//---------------------------
function renderCat(category){

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

function renderHome(req, res) {
	
	// Get appropriate HTML for home
	return fs.readFile(homepagePath, 'utf8', (err, data) => {

		// If cannot locate index.html...
		if (err) {
			console.log('File not found: '+ homepagePath);
			// res.writeHead(503);
			// res.end();
			res.status(503).end();
			return;
		}

		// console.log('Request URL: '+ req.url);

		try {

			// Decide what content goes into home
			// - Get 'targetPath' from pathRef and req.url
			let targetPath = pathRef[req.url];

			// - If not a path...
			if (targetPath == null || targetPath == undefined) {
				targetPath = pathRef['/404'];
			}

			let targetContent;

			// Fetch and insert the desired content
			// - Any page with '/cat/' needs to be built from JSON
			// - All other pages (blog posts and static pages) are just retrieved and inserted
			if (isSummaryRequest(targetPath)) {
				let category = targetPath.replace('/cat/', '');
				targetContent = renderCat(category);
			} else {
				targetContent = fs.readFileSync('.'+ targetPath, 'utf8');
			}

			// Insert content
			let pageHTML = data.replace('{{Loading...}}', targetContent);

			// Return
			res.send(pageHTML);
		} catch (e) {
			res.status(503).end();
		}
	});
}

module.exports.renderCat = renderCat;
module.exports.renderHome = renderHome;