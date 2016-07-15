'use strict';

const http = require('http');
const express = require('express');
const app = express();

const render = require('./server-render.js');
const instagram = require('./server-instagram.js');


// CREATE SERVER
//======================
// Static Files
app.use(express.static('/'));

// Routing:
//------------
// - Static Pages
// - Internal request: Post Summary page for a category
// - Instagram api
// - All initial website requests, which need to insert the desired page into the homepage
//---------------

// Category page (only from internal links, so just return a built post-summary page
app.get('/cat/:category', (req, res) => {
	let HTMLresponse = render.renderCat( req.params.category );
	res.send( HTMLresponse );
});


// Instagram API
app.get('/instagram-data', (req, res) => {
	console.log('Recieved instagram data request');
	instagram(res);
});

// Catch-all. Basically any first request to load the entire website. After that, all requests will be either static files or for the category page above
app.get('/', (req, res) => {
	render.renderHome(req, res);
});


// Start server
//-----------------
app.listen(3000, () => console.log('Server started on port 3000') );