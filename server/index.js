
const http = require('http');

const server = http.createServer((response, request) => {
	response.writeHead(200, {'Content Type': 'text/html'});
	response.end();
});