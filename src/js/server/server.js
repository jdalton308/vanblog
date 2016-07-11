'use strict';

const http = require('http');
const router = require('./server-router.js');
const EC2_IP = '52.11.115.75';


// Create Server
const server = http.createServer((req,res) => {
	router(req, res);
});

server.listen(80, EC2_IP);

console.log("Server started on port 80 for "+ EC2_IP);
