'use strict';

// Routing/API:
// - For lists of latest posts, request == '/cat/:category'
// - For Instagram API, request == '/instagram'
// - For static files, include a file extension
// - All other requests refer to 'server-path-ref.js'

// - EX//: GET for '/about'
	// - Server returns 'index.html', but references path against 'server-path-ref.js' and inserts page HTML



const fs = require('fs');
const postRef = require('./server-post-ref.js');
const render = require('./server-render.js');
const pathRef = require('./server-path-ref.js');
const instagram = require('./server-instagram.js');


// Utility Functions
//------------------------------
function isStaticFile(path) {
	let dotRegEx = /[a-z0-9]\.[a-z]/i;
	return dotRegEx.test(path);
}
// URL = /*.svg
function isSvgFile(path) {
	let svgRegEx = /\.svg/i;
	return svgRegEx.test(path);
}
// URL = '/cat/...'
function isCatRequest(path) {
	let catRegEx = /\/cat\//i;
	return catRegEx.test(path);
}
// URL = '/instagram-data'
function isIGRequest(path) {
	let catRegEx = /\/instagram-data/i;
	return catRegEx.test(path);
}


// Router functions
//---------------------------
function requestStaticFile(path, res) {
	return fs.readFile(path, (err, data) => {
		if (err) {
			console.log('File not found: '+ path);
			res.writeHead(404);
			res.end();
			return;
		}

		if (isSvgFile(path)) {
			res.setHeader('Content-Type', 'image/svg+xml');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	});
}
function requestCatSummary(path, res) {
	// Generate HTML
	let HTML = render.renderCat(path);

	res.writeHead(200);
	res.write(HTML);
	res.end();
	return true;
}
function requestHome(path, res) {
	// Get appropriate HTML for home
	return fs.readFile('./index.html', 'utf8', (err, data) => {
		if (err) {
			console.log('File not found: ./index.html');
			res.writeHead(503);
			res.end();
			return;
		}

		// Decide what content goes into home
		let targetPath = pathRef[path];
		if (targetPath == null || targetPath == undefined) {
			targetPath = '/pages/404.html';
		}

		let targetContent;

		// Fetch content OR render content
		if (isCatRequest(targetPath)) {
			targetContent = render.renderCat(targetPath);
		} else {
			targetContent = fs.readFileSync('.'+ targetPath, 'utf8');
		}

		// Insert content
		let pageHTML = data.replace('{{Loading...}}', targetContent);

		// Return
		res.writeHead(200);
		res.write(pageHTML);
		res.end();
	});
}


// Main Router
//---------------------------
function route(req, res) {
	let requestPath = req.url;

	console.log('Request for '+ req.url);

	// Standard static file request
	if (isStaticFile(requestPath)) {
		console.log('Request for static file');
		return requestStaticFile('.'+ requestPath, res);

	// ** This 'category' request would not happen here **
	// // Request for generated category page
	// } else if (isCatRequest(requestPath)){
	// 	// Render the category HTML
	// 	console.log('Category page request');
	// 	return requestCatSummary(requestPath, res);

	// Request for Instagram photos
	} else if (isIGRequest(requestPath)){
		console.log('Request for IG photos');
		return instagram(res);

	// Home request
	} else {
		console.log('Request for home variant');
		return requestHome(requestPath, res);
	}
}

module.exports = route;