'use strict';

// const IG_id = '9e8f810b45034d1d973cc0f825af5d61';
// const IG_secret = '84d4b1ca4014496cb2ec0ed14e12fa36';
const access_token = '678278338.1677ed0.ee369683d6c54a7f8260dbb7e9271ef2';
// const post_count = 15;
// const redirect_uri = 'www.joeplusvan.com';


const http = require('http');
let instagramAPI = require('instagram-api');
instagramAPI = new instagramAPI(access_token);


// Get photos. Returns a promise
function getPhotoData(res) {
	instagramAPI.userSelfMedia().then(
		(data) => {
			// console.log('Recieved IG data...');
			// res.writeHead(200, {'Content-Type': 'application/json'});
			// let jsonData = JSON.stringify(data);
			// res.end(jsonData);
			res.json(data);
		}
	).catch(
		(error) => {
			console.log(error);
			// res.writeHead(500);
			// res.end(error);
			res.status(500).end(error);
		}
	);

}


module.exports = getPhotoData;