'use strict';

const http = require('http');
const router = require('./server-router.js');


// Create Server
const server = http.createServer((req,res) => {
	router(req, res);
});

server.listen(80);

console.log("Server started on port 80");