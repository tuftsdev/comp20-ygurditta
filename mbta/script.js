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

var stations_array = [alewife, davis, porter, harvard, central, kendall, charles, park, downtown, south, broadway, andrew, jfk, northquincy, wollaston, quincycenter, quincyadams, braintree, savin, fields, shawmut, ashmont];

function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
	myLat = position.coords.latitude;
    myLong = position.coords.longitude;
    printMap();
}

function initMap() {
	getLocation();
}

function printMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: myLat, lng: myLong},
	    zoom: 13
	});
	var marker = new google.maps.Marker({
	    position: {lat: myLat, lng: myLong},
	    map: map,
	    title: "My Location",
	    icon: {
	    	 size: new google.maps.Size(50, 50),
            scaledSize: new google.maps.Size(50, 50),
	    	url: 'my-location-pin.png'
        }
		});
	addPins();
}

function addPins() {
	stations_array.forEach(function(station) {
		var marker = new google.maps.Marker({
		    position: {lat: station.lat, lng: station.lon},
		    map: map,
		    title: station.name,
		    icon: {
	    		size: new google.maps.Size(50, 50),
            	scaledSize: new google.maps.Size(50, 50),
	    		url: 'red-line-pin.png'
        	}
		});
	});
	addPolylines();
}

function addPolylines() {
	var polylineCoordinates = [];
	var leftSplit = [{lat: 42.320685, lng: -71.052391}];
	var rightSplit = [];
	var i = 0;
	var j = 12;
	var k = 18;
	while (stations_array[i].name != "North Quincy Station") {
        polylineCoordinates.push({lat: stations_array[i].lat, lng: stations_array[i].lon});
        i++;
    }
    while (stations_array[j].name != "Savin Hill Station") {
        rightSplit.push({lat: stations_array[j].lat, lng: stations_array[j].lon});
        j++;
    }
    while (k < stations_array.length) {
        leftSplit.push({lat: stations_array[k].lat, lng: stations_array[k].lon});
        k++;
    }
    var stationPath = new google.maps.Polyline({
          path: polylineCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
    var stationPathLeft = new google.maps.Polyline({
          path: leftSplit,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
    var stationPathRight = new google.maps.Polyline({
          path: rightSplit,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
    stationPath.setMap(map);
    stationPathLeft.setMap(map);
    stationPathRight.setMap(map);
    makeRequest();
}

function makeRequest() {
	request = new XMLHttpRequest();
 	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
 	if (request.readyState == 4 && request.status == 200){
		theData = request.responseText;
		sched = JSON.parse(theData);
	} 
	else if (request.readyState == 4) {
	    request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
		request.send();
	}
 	request.send();
}




