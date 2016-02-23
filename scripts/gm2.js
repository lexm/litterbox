function PlaceGoogle(opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele];
  }, this);
}

PlaceGoogle.all = [];

var map;
var service;
var infowindow;




function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  var bhzc = new google.maps.LatLng(47.70343, -122.3400718);
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
      center: bhzc,
      zoom: 11
    });

  var request = {
    location: bhzc,
    radius: '500',
    query: 'cat shelter'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    console.log(infowindow);
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function callback(results, status) {
  console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    PlaceGoogle.all = results.map(function(ele){
      return new PlaceGoogle(ele);
    })
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
