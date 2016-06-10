'use strict';

const http = require('http');
// const fs = require('fs');
const router = require('./server-router.js');


// Create Server
const server = http.createServer((req,res) => {

	console.log('Request from:'+ req.url);

	router(req, res);
	// res.end();
});

server.listen(3000, 'localhost');

console.log('Server started on localhost:3000');
// console.log('Current directory: '+ __dirname);