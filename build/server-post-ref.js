'use strict';

// JSON with array of posts, in chronological order


let posts = [
	{
		'name': 'Van Build: Van Selection',
		'date': '6.1.2016',
		'categories': ['Van'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/van-model',
		'description': 'Some of the van models I considered when shopping, and the important features I took into account.'
	},
	{
		'name': 'Van Build: Van Woodwork',
		'date': '6.3.2016',
		'categories': ['Van'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/van-carpentry',
		'description': 'The main construction that went into the van, including insulation, paneling on walls and ceiling, flooring, the bed frame, and custom shelving.'
	},
	{
		'name': 'Van Build: Other Resources',
		'date': '6.13.2016',
		'categories': ['Van'],
		// 'thumbnail': '/path/to/thumbnail'(?),
		'link': '/blog/van-build-resources',
		'description': 'A collection of other resouces for building a van, including websites, forums, and videos.'
	}
];

module.exports = posts;