'use strict';

const http = require('http');
const router = require('./server-router.js');


// Create Server
const server = http.createServer((req,res) => {

	// console.log('Request from:'+ req.url);

	router(req, res);
});

server.listen(3000, 'localhost');

console.log('Server started...');