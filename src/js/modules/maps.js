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
		title: 'Susanville, CA',
		position: {lat:40.4162842, lng:-120.65300630000002}
	},
	{
		title: 'Klamath Falls, CA',
		position: {lat:42.224867, lng:-121.7816704}
	},
	{
		title: 'Crater Lake, OR',
		position: {lat:42.9445872, lng:-122.1090039}
	},
	{
		title: 'Bend, OR',
		position: {lat:44.05817279999999, lng:-121.31530959999998}
	},
	{
		title: 'Smith Rock, OR',
		position: {lat:44.36761240000001, lng:-121.13898749999998}
	},
	{
		title: 'Ellensburg, OR',
		position: {lat:46.9965144, lng:-120.54784740000002}
	},
	{
		title: 'Leavenworth, WA',
		position: {lat:47.5962326, lng:-120.66147649999999}
	},
	{
		title: 'Seattle, WA',
		position: {lat: 47.6062095, lng:-122.3320708}
	},
	{
		title: 'Portland, OR',
		position: {lat: 45.5231, lng:-122.6765}
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