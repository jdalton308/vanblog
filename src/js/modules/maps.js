// API Key: AIzaSyBsK3m9FE0rOvlwJLID6d4s7Hd_teIr8v0

// Location Reference
//----------------------------
// Berkeley: lat:37.8715926, lng:-122.27274699999998
// South Lake Tahoe: lat:38.939926, lng:-119.97718680000003
// Mammoth Lakes: lat:37.648546, lng:-118.97207900000001
// Bishop: lat:37.3614238, lng:-118.3996636
// North Lake Tahoe: lat:39.249683, lng:-119.95268470000002
// Susanville: lat:40.4162842, lng:-120.65300630000002
// Klamath Falls: lat:42.224867, lng:-121.7816704
// Crater Lake: lat:42.9445872, lng:-122.1090039
// Bend: lat:44.05817279999999, lng:-121.31530959999998
// Smith Rock: lat:44.36761240000001, lng:-121.13898749999998
// Ellensburg: lat:46.9965144, lng:-120.54784740000002
// Leavenworth: lat:47.5962326, lng:-120.66147649999999
// Seattle: lat: 47.6062095, lng:-122.3320708


var locations = [
	{
		title: 'Berkeley',
		position: {lat:37.8715926, lng:-122.27274699999998}
	},
	{
		title: 'South Lake Tahoe',
		position: {lat:38.939926, lng:-119.97718680000003}
	},
	{
		title: 'Mammoth Lakes',
		position: {lat:37.648546, lng:-118.97207900000001}
	},
	{
		title: 'Bishop',
		position: {lat:37.3614238, lng:-118.3996636}
	},
	{
		title: 'North Lake Tahoe',
		position: {lat:39.249683, lng:-119.95268470000002}
	},
	{
		title: 'Susanville',
		position: {lat:40.4162842, lng:-120.65300630000002}
	},
	{
		title: 'Klamath Falls',
		position: {lat:42.224867, lng:-121.7816704}
	},
	{
		title: 'Crater Lake',
		position: {lat:42.9445872, lng:-122.1090039}
	},
	{
		title: 'Bend',
		position: {lat:44.05817279999999, lng:-121.31530959999998}
	},
	{
		title: 'Smith Rock',
		position: {lat:44.36761240000001, lng:-121.13898749999998}
	},
	{
		title: 'Ellensburg',
		position: {lat:46.9965144, lng:-120.54784740000002}
	},
	{
		title: 'Leavenworth',
		position: {lat:47.5962326, lng:-120.66147649999999}
	},
	{
		title: 'Seattle',
		position: {lat: 47.6062095, lng:-122.3320708}
	}
];


// Create Map
//--------------------
// TODO: 
// - List cities
// - Draw line bewteen points. On road?
// - Color map
function drawMap() {
	var canvas = document.getElementById('map-canvas');
	var mapOptions = {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	};

	var map = new google.maps.Map(canvas, mapOptions);

	return map;
}

// Drop markers for places
function setMarkers(markerArray, map) {
	markerArray.forEach(function(markerObj, i){
		var newMarker = new google.maps.Marker(markerObj);
		newMarker.setMap(map);
	});
}

function init() {
	var map = drawMap();
	setMarkers(locations, map);
}


module.exports = init;