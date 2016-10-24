var myLat;
var myLong;
var map;
var myLocation;

var alewife = {name: "Alewife Station",lat: 42.395428,lon: -71.142483};
var davis = {name: "Davis Station",lat: 42.39674 ,lon: -71.121815};
var porter = {name: "Porter Square Station",lat: 42.3884,lon: -71.11914899999999};
var harvard = {name: "Harvard Square Station",lat: 42.373362,lon: -71.118956};
var central = {name: "Central Square Station",lat: 42.365486,lon: -71.103802};
var kendall = {name: "Kendall Station",lat: 42.36249079,lon: -71.08617653};
var charles = {name: "Charles/MGH Station",lat: 42.361166,lon: -71.070628};
var park = {name: "Park Street Station",lat: 42.35639457,lon: -71.0624242};
var downtown = {name: "Downtown Crossing Station",lat: 42.355518,lon: -71.060225};
var south = {name: "South Station",lat: 42.352271,lon: -71.05524200000001};
var broadway = {name: "Broadway Station",lat: 42.342622,lon: -71.056967};
var andrew = {name: "Andrew Station",lat: 42.330154,lon: -71.057655};
var jfk = {name: "JFK/UMass Station",lat: 42.320685,lon: -71.052391};
var northquincy = {name: "North Quincy Station",lat: 42.275275,lon: -71.029583};
var wollaston = {name: "Wollaston Station",lat: 42.2665139,lon: -71.0203369};
var quincycenter = {name: "Quincy Center Station",lat: 42.251809,lon: -71.005409};
var quincyadams = {name: "Quincy Adams Station",lat: 42.233391,lon: -71.007153};
var braintree = {name: "Braintree Station",lat: 42.2078543,lon: -71.0011385};
var savin = {name: "Savin Hill Station",lat: 42.31129,lon: -71.053331};
var fields = {name: "Field Corner",lat: 42.300093,lon: -71.061667};
var shawmut = {name: "Shawmut Station",lat: 42.29312583,lon: -71.06573796000001};
var ashmont ={name: "Ashmont Station",lat: 42.284652,lon: -71.06448899999999};

stations = {alewife, davis, porter, harvard, central, kendall, charles, park, downtown, south, broadway, andrew, jfk, northquincy, wollaston, quincycenter, quincyadams, braintree, savin, fields, shawmut, ashmont};

function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	myLat = position.coords.latitude;
    myLong = position.coords.longitude;
}

function initMap() {
	getLocation();
    myLocation = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.3601, lng: -71.0589},
	    zoom: 13
	});
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: myLat, lng: myLong},
	    zoom: 13
	});
}

