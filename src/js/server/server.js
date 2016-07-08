'use strict';

const http = require('http');
const router = require('./server-router.js');


// Create Server
const server = http.createServer((req,res) => {
	router(req, res);
});

<<<<<<< HEAD
server.listen(80);

console.log("Server started on port 80");
=======
server.listen(3000, 'localhost');

console.log('Server started...');
>>>>>>> master
