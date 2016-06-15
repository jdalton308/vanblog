'use strict';

// JSON with array of posts, in chronological order
// Possible categories: 'Van', 'Travel', 'Climbing'


let posts = [
	{
		'name': 'Test Post 1',
		'date': '01.03.16',
		'categories': ['Van', 'Travel', 'Climbing'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/post-1',
		'description': 'This is a short description of post 1'
	},
	{
		'name': 'Test Post 2',
		'date': '01.30.16',
		'categories': ['Van', 'Travel'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/post-2',
		'description': 'This is a short description of post 2'
	},
	{
		'name': 'Test Post 3',
		'date': '03.07.16',
		'categories': ['Van', 'Climbing'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/post-3',
		'description': 'This is a short description of post 3'
	},
	{
		'name': 'Van Build: Van Selection',
		'date': '6.1.2016',
		'categories': ['Van'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/van-model',
		'description': 'Some of the van models I considered when shopping, and the important features I took into account.'
	}
];

module.exports = posts;