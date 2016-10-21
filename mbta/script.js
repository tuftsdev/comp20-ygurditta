var myLat;
var myLong;
var map;

function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	myLat = position.coords.latitude;
    myLong = position.coords.longitude;
    console.log(myLat);
    console.log(myLong);
}

function initMap() {
	getLocation();
	console.log(myLat);
    console.log(myLong);
    map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: myLat, lng: myLong},
	    zoom: 13
	});
}