// API Key: AIzaSyBsK3m9FE0rOvlwJLID6d4s7Hd_teIr8v0

var $ = require('jquery');


var locations = [
	{
		title: 'Berkeley, CA',
		position: {lat:37.8715926, lng:-122.27274699999998}
	},
	{
		title: 'South Lake Tahoe, CA',
		position: {lat:38.939926, lng:-119.97718680000003}
	},
	{
		title: 'Mammoth Lakes, CA',
		position: {lat:37.648546, lng:-118.97207900000001}
	},
	{
		title: 'Bishop, CA',
		position: {lat:37.3614238, lng:-118.3996636}
	},
	{
		title: 'Incline Village, CA',
		position: {lat:39.249683, lng:-119.95268470000002}
	},
	{
		title: 'Mt. Shasta',
		position: {lat:41.4093393, lng:-122.1985981}
	},
	{
		title: 'Crater Lake National Park',
		position: {lat:42.9445872, lng:-122.1090039}
	},
	{
		title: 'Bend, OR',
		position: {lat:44.05817279999999, lng:-121.31530959999998}
	},
	{
		title: 'Smith Rock State Park, OR',
		position: {lat:44.36761240000001, lng:-121.13898749999998}
	},
	{
		title: 'Leavenworth, WA',
		position: {lat:47.5962326, lng:-120.66147649999999}
	},
	{
		title: 'Portland, OR',
		position: {lat: 45.5231, lng:-122.6765}
	},
	{
		title: 'Seattle, WA',
		position: {lat: 47.6062095, lng:-122.3320708}
	},
	{
		title: 'Spokane, WA',
		position: {lat: 47.6062095, lng:-122.3320708}
	},
	{
		title: 'Brush Lake, ID',
		position: {lat: 48.887544, lng:-116.3314314}
	},
	{
		title: 'Whitefish, MT',
		position: {lat: 48.4296597, lng:-114.4404459}
	},
	{
		title: 'Glacier National Park',
		position: {lat: 48.7596163, lng:-113.7892112}
	},
	{
		title: 'Missoula, MT',
		position: {lat: 46.8764175, lng:-114.0882065}
	},
	{
		title: 'Bozeman, MT',
		position: {lat: 45.6795612, lng:-111.0859213}
	},
	{
		title: 'Yellowstone National Park',
		position: {lat: 44.4279828, lng:-110.597209}
	},
	{
		title: 'Grand Teton National Park',
		position: {lat: 43.7904321, lng:-110.6839514}
	},
	{
		title: 'Jackson, WY',
		position: {lat: 43.4745489, lng:-110.793107}
	},
	{
		title: 'Boulder, CO',
		position: {lat: 40.0294203, lng:-105.3100171}
	},

];


// Create Map
//--------------------
function drawMap() {
	var canvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: {lat:37.8715926, lng:-122.27274699999998},
		zoom: 8,
	};

	var map = new google.maps.Map(canvas, mapOptions);

	return map;
}

// Drop markers for places
function setMarkers(markerArray, map) {
	var bounds = new google.maps.LatLngBounds();

	markerArray.forEach(function(markerObj, i){
		var newMarker = new google.maps.Marker(markerObj);
		newMarker.setMap(map);
		bounds.extend(newMarker.position);
	});

	map.fitBounds(bounds);
}

// Connect markers
function connectDots(markerArray, map) {

	function createCoordArray(array) {
		var returnArray = [];
		array.forEach(function(spot, i){
			returnArray.push(spot.position);
		});
		return returnArray;;
	}

	var coordArray = createCoordArray(markerArray);


	var driveLine = new google.maps.Polyline({
		path: coordArray,
		geodesic: true,
		strokeColor: '#f24b4b',
		strokeOpacity: 1.0,
		strokeWeight: 5
	});

	driveLine.setMap(map);
}

// Style map
function colorMap(map) {
	var styles = [
		{
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{ visibility: "off" }
			]
		},{
			featureType: "transit",
			elementType: "all",
			stylers: [
				{ visibility: "off" }
			]
		},{
			featureType: "road",
			elementType: "labels",
			stylers: [
				{ visibility: "off" }
			]
		},{
			featureType: "administrative",
			elementType: "labels",
			stylers: [
				{ visibility: "off" }
			]
		},{
			featureType: "administrative.locality",
			elementType: "labels",
			stylers: [
				{ visibility: "on" }
			]
		},{
			featureType: "administrative.province",
			elementType: "labels",
			stylers: [
				{ visibility: "on" }
			]
		},{
			featureType: "road",
			elementType: "geometry",
			stylers: [
				{ saturation: -100 },
				{ lightness: 80 }
			]
		},{
			featureType: 'landscape.natural.terrain',
			elementType: 'geometry',
			stylers: [
				{ hue: '#8AF78A' },
				{ lightness: 50 }
			]
		},{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [
				{ color: '#6bd6f1' }
			]
		},{
			featureType: 'water',
			elementType: 'labels',
			stylers: [
				{ visibility: 'off' }
			]
		}
	];

	map.setOptions({styles: styles});
}

// Add list of spots
function createList(markerArray) {
	var $spotList = $('.spot-list');
	var listHTML = '';

	markerArray.forEach(function(spot, i){
		var thisTitle = spot.title;
		var thisHTML = '<li>' + thisTitle + '</li>';
		listHTML += thisHTML;
	});

	$spotList.html(listHTML);
}



function init() {
	var map = drawMap();
	setMarkers(locations, map);
	connectDots(locations, map);
	colorMap(map);
	createList(locations);
}


module.exports = init;