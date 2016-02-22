function initMap() {
  // var mapDiv = $('#map');
  var mapDiv = $('#map')[0];
  var map = new google.maps.Map(mapDiv, {
    center: {
      lat: 44.540,
      lng: -78.546
    },
    zoom: 8
  });

  var codeFellows = new google.maps.LatLng(47.6235733, -122.3382628);
  var bhzc = new google.maps.LatLng(47.70343, -122.3400718);
  var map2 = new google.maps.Map($('#map2')[0], {
    center: bhzc,
    zoom: 14
  });
  var request = {
    location: bhzc,
    radius: 1000,
    type: 'veterinary_care'
  };
  var infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map2);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(function(cur, idx, arr) {
        var place = cur;
        console.log(cur);
        createMarker(cur);
      });
      // for (var i = 0; i < results.length; i++) {
      //   var place = results[i];
      //   createMarker(results[i]);
      // }
    };

  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map2,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map2, this);
    });
  }

  // var map2 = new GMaps({
  //   div: '#map2',
  //   lat: 47.6235733,
  //   lng: -122.3382628
  // });
};
