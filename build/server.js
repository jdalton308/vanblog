'use strict';

const EC2_IP = 'ec2-52-11-115-75.us-west-2.compute.amazonaws.com';
const express = require('express');
const app = express();

const render = require('./server-render.js');
const instagram = require('./server-instagram.js');


// CREATE SERVER
//======================

// app.all('*', (req, res) => {
// 	console.log('Request from '+ req.url);
// });

// Static Files
//---------------
app.use(express.static( __dirname, {index: false} ));


// Routing:
//------------
// - Static Pages
// - Internal request: Post Summary page for a category
// - Instagram api
// - All initial website requests, which need to insert the desired page into the homepage

// Category page (only from internal links, so just return a built post-summary page
app.get('/cat/:category', (req, res) => {
	// console.log('Category request');
	let HTMLresponse = render.renderCat( req.params.category );
	res.send( HTMLresponse );
});


// Instagram API
app.get('/instagram-data', (req, res) => {
	// console.log('Recieved instagram data request');
	instagram(res);
});

// Catch-all. Basically any first request to load the entire website. After that, all requests will be either static files or for the category page above
app.get('*', (req, res) => {
	// console.log('Home request');
	render.renderHome(req, res);
});


// Start server
//-----------------
app.listen(80, () => {
	console.log("Server started on port 80 for "+ EC2_IP);
	// console.log('Root directory: '+ __dirname);
});
