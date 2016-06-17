'use strict';

const IG_id = '9e8f810b45034d1d973cc0f825af5d61';
const IG_secret = '84d4b1ca4014496cb2ec0ed14e12fa36';
const access_token = '678278338.1677ed0.ee369683d6c54a7f8260dbb7e9271ef2';
const post_count = 15;
const redirect_uri = 'www.joeplusvan.com';


const http = require('http');
// const ig = require('instagram-node').instagram();
let instagramAPI = require('instagram-api');
instagramAPI = new instagramAPI(access_token);


// ig.use({ client_id: IG_id, client_secret: IG_secret });


// STEPS:
// - On client request for '/instagram',
// - If no access_token, get token, save it, then,
// - Make call for photo data
// - Finally, return photo data


// Get access token. Returns a promise
// function getAccessToken(req) {

// 	let promise = new Promise( (resolve, reject) => {
// 		console.log('Inside promise...');
// 		ig.authorize_user(req.query.code, redirect_uri, (err, result) => {
// 			if (err) {
// 				console.log('Error retrieving access_token:')
// 				console.log(err.body);
// 				reject(err);
// 			} else {
// 				console.log('Recieved access token:');
// 				console.log(result);

// 				access_token = result.access_token;
// 				resolve(result);
// 			}
// 		});
// 	});

// 	return promise;
// }

// Get photos. Returns a promise
function getPhotoData(res1) {

	// let request_URL = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + access_token + '&count=' + post_count;

	// let promise = new Promise( (resolve, reject) => {
		// console.log('Request for '+ request_URL);
		// let options = {
		// 	count: post_count
		// }

		// console.log('getting data...');

		// ig.user_self_feed(options, (err, medias, pagination, remaining, limit) => {
		// 	let data = {
		// 		err: err,
		// 		medias: medias,
		// 		pagination: pagination,
		// 		remaining: remaining,
		// 		limit: limit
		// 	};
		// 	resolve(data);
		// });


		// let request = http.get(request_URL, (res) => {
		// 	res.setEncoding('utf8');
		// 	console.log('IG Response:');
		// 	console.log(res);

		// 	let photoData = '';

		// 	// res.on('data', (data) => {
		// 		// console.log('Recieved some IG data...');
		// 		// photoData += data;
		// 	// });
		// 	// res.on('end', () => {
		// 	console.log('Finished recieving IG data');

		// 	// RESOLVE PROMISE
		// 	resolve(res);

		// 	res.resume();
		// 	// });
		// });

		// request.on('error', (err) => {
		// 	console.error('Error getting user Instagram data');
		// 	console.error(err);
		// 	reject(err);
		// });

		// request.on('timeout', (err) => {
		// 	console.log('IG request timeout');
		// 	req.abort();
		// 	reject(err);
		// });

		// request.setTimeout(10000);

		
	// });

	// promise.then(
	instagramAPI.userSelfMedia().then(
		(data) => {
			console.log('Recieved IG data...');
			res1.writeHead(200, {'Content-Type': 'application/json'});
			let stringData = data.toString('utf8');
			res1.end(stringData);
		}
	).catch(
		(error) => {
			console.log(error);
			res1.writeHead(500);
			res1.end(error);
		}
	);

}

// Main Logic
function getPhotos(res) {

	// If have access_token, just get photos:
	// if (access_token) {
		getPhotoData(res);

	// If no access_token...
	// } else {

	// 	// Get access token, then photo data...
	// 	getAccessToken(req).then(
	// 		(data) => {
	// 			return getPhotoData(res);
	// 		}
	// 	).catch(
	// 		(err) => {
	// 			res.writeHead(500);
	// 			return res.end('Could not get access token');
	// 		}
	// 	);

	// }
}


module.exports = getPhotos;