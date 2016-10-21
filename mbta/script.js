var map;

function success(pos) {
  var crd = pos.coords;
}

navigator.geolocation.getCurrentPosition(success);

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: crd.latitude, lng: crd.longitude},
    	zoom: 8
	});
}