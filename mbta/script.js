var myLat;
var myLong;
var map;
var myLocation;
var data;
var schedInfo;

var alewife = {name: "Alewife",lat: 42.395428,lon: -71.142483};
var davis = {name: "Davis",lat: 42.39674 ,lon: -71.121815};
var porter = {name: "Porter Square",lat: 42.3884,lon: -71.11914899999999};
var harvard = {name: "Harvard Square",lat: 42.373362,lon: -71.118956};
var central = {name: "Central Square",lat: 42.365486,lon: -71.103802};
var kendall = {name: "Kendall/MIT",lat: 42.36249079,lon: -71.08617653};
var charles = {name: "Charles/MGH",lat: 42.361166,lon: -71.070628};
var park = {name: "Park Street",lat: 42.35639457,lon: -71.0624242};
var downtown = {name: "Downtown Crossing",lat: 42.355518,lon: -71.060225};
var south = {name: "South Station",lat: 42.352271,lon: -71.05524200000001};
var broadway = {name: "Broadway",lat: 42.342622,lon: -71.056967};
var andrew = {name: "Andrew",lat: 42.330154,lon: -71.057655};
var jfk = {name: "JFK/UMass",lat: 42.320685,lon: -71.052391};
var northquincy = {name: "North Quincy",lat: 42.275275,lon: -71.029583};
var wollaston = {name: "Wollaston",lat: 42.2665139,lon: -71.0203369};
var quincycenter = {name: "Quincy Center",lat: 42.251809,lon: -71.005409};
var quincyadams = {name: "Quincy Adams",lat: 42.233391,lon: -71.007153};
var braintree = {name: "Braintree",lat: 42.2078543,lon: -71.0011385};
var savin = {name: "Savin Hill",lat: 42.31129,lon: -71.053331};
var fields = {name: "Field Corner",lat: 42.300093,lon: -71.061667};
var shawmut = {name: "Shawmut",lat: 42.29312583,lon: -71.06573796000001};
var ashmont ={name: "Ashmont",lat: 42.284652,lon: -71.06448899999999};

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
	var closestData = closestStation();
	var infoBox = "<p>Closest station is " + closestData[0] + " and it is " + closestData[1] + " miles away.</p>";
	var locationInfoBox = new google.maps.InfoWindow({
        content: infoBox
    });
    marker.addListener('click', function() {
        locationInfoBox.open(map, marker);
    });
	addPins();
}

var nextTrainInfo = "";
var nextTrainInfoBox;
var infowindow;

function addPins() {
	request = new XMLHttpRequest();
  	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
  	request.onreadystatechange = function() {
  				if (request.readyState == 4 && request.status == 200) {
  					theData = request.responseText;
    				schedInfo = JSON.parse(theData);
					infoPins();
				}
	};
	request.send();
	addPolylines();
}

function infoPins() {
	for (var i=0; i < stations_array.length; i++) {
					// received help with this loop
					var marker = new google.maps.Marker({
					    position: {lat: stations_array[i].lat, lng: stations_array[i].lon},
					    map: map,
					    title: stations_array[i].name,
					    icon: {
				    		size: new google.maps.Size(50, 50),
			            	scaledSize: new google.maps.Size(50, 50),
				    		url: 'red-line-pin.png'
			        	}
					});
					schedInfo.TripList.Trips.forEach(function(train){
					    train.Predictions.forEach(function(time){
					      	if(time.Stop == stations_array[i].name) {
					        	nextTrainInfo = "<p>The destination of next train is " + train.Destination + " in " + time.Seconds + " seconds.</p>";
					      	}
					    });
					});		
							    console.log(nextTrainInfo);
							  	infowindow = new google.maps.InfoWindow({
							    	content: this.nextTrainInfo
							    });
							  	google.maps.event.addListener(marker, 'click', function() {
								    infowindow.open(map, this);
								    infowindow.setContent(this.nextTrainInfo);
							  	});
			}
}

function funex() {
	if (request.readyState == 4 && request.status == 200) {
  		theData = request.responseText;
    	schedInfo = JSON.parse(theData);
  	}
}

function addPolylines() {
	var polylineCoordinates = [];
	var leftSplit = [{lat: 42.320685, lng: -71.052391}];
	var rightSplit = [];
	var i = 0;
	var j = 12;
	var k = 18;
	while (stations_array[i].name != "North Quincy") {
        polylineCoordinates.push({lat: stations_array[i].lat, lng: stations_array[i].lon});
        i++;
    }
    while (stations_array[j].name != "Savin Hill") {
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
}

function closestStation() {
	var myLoc = [myLat, myLong];
	var closestStation = stations_array[0];
	var shortestDistance = getDistance([stations_array[0].lat, stations_array[0].lon], myLoc);
  	for (var i=1; i < stations_array.length; i++) {
	    stationDistance = getDistance([stations_array[i].lat, stations_array[i].lon], myLoc);
	    if (stationDistance < shortestDistance) {
	      shortestDistance = stationDistance;
	      closestStation = stations_array[i];
	    }
  	}

  	closestStationPolyline = new google.maps.Polyline({
	    path:[{lat: myLat, lng: myLong}, {lat:closestStation.lat, lng:closestStation.lon}],
	    strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 3
  	});

  	closestStationPolyline.setMap(map);

  	return [closestStation.name, shortestDistance];
}

// Resource: http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
function getDistance(location1, location2) {
  	Number.prototype.toRad=function(){
    	return this*Math.PI/180;
  	}

  	var lat1 = location1[0];
  	var lon1 = location1[1];
  	var lat2 = location2[0];
  	var lon2 = location2[1];

  	var R=6371;

 	var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lon2-lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // adjust for miles
  	var d = R * c;

  return d;
}



