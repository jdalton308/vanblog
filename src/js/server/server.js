'use strict';

const http = require('http');
const express = require('express');
const router = require('./server-router.js');
const app = express();


const fs = require('fs');
const postRef = require('./server-post-ref.js');
const render = require('./server-render.js');
const pathRef = require('./server-path-ref.js');
const instagram = require('./server-instagram.js');

// CREATE SERVER
//======================
// Static Files
app.use(express.static('/'));

// Routing:
// - Home
// - Static Pages
// - Blog posts
// - Instagram api
//---------------
// Home
app.get(['/', '/home', '/latest'], (req, res) => {
	console.log('Home request');
	res.send('Home page');
});

// Pages
app.get('/:page', (req, res, next) => {
	if (req.params.page === 'blog') {
		next('route');
	}
	res.send('Page request for '+ req.params.page);
});

// Blog
app.get(['/blog', '/blog/:cat'], (req, res) => {
	console.log('Recieved category request');
	let category = req.params.cat;
	if (category === undefined || category == null) {
		category = 'all';
	}
	res.send('Category request for '+ category);
});
app.get('/blog/post/:postname', (req, res) => {
	console.log('Recieved post request');
	res.send('Request for blog post: '+ req.params.postname);
});


// Instagram API
app.get('/instagram-data', (req, res) => {
	console.log('Recieved instagram data request');
	// return instagram(res);
});


// Start server
//-----------------
app.listen(3000, () => console.log('Server started on port 3000') );