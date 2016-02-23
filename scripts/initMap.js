function ShelterGoogle(opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele];
  }, this);
}

ShelterGoogle.all = [];

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(function(cur, idx, arr) {
      var place = cur;
      console.log(cur);
      createMarker(cur);
    });
    shelterGoogle.all = results.map(function() {
      return cur;
    })
    // for (var i = 0; i < results.length; i++) {
    //   var place = results[i];
    //   createMarker(results[i]);
    // }
  };

}


ShelterGoogle.requestList = function(searchCenter, searchLocation, searchRadius, searchType, callback) {
  var map2 = new google.maps.Map($('#map2')[0], {
    center: searchCenter,
    zoom: 11
  });
  var request = {
    location: searchLocation,
    radius: searchRadius
  }
  if (searchType == 'veterinary_care') {
    request.type = 'veterinary_care';
  } else {
    request.keyword = searchType;
  }
  console.log(request);
  service = new google.maps.places.PlacesService(map2);
  service.nearbySearch(request, callback);
}


function initMap() {
  // var mapDiv = $('#map');
  var codeFellows = new google.maps.LatLng(47.6235733, -122.3382628);
  var cf = {
    lat: 47.6235733,
    lng: -122.3382628
  }
  var bhzc = new google.maps.LatLng(47.70343, -122.3400718);
  var mapDiv = $('#map')[0];
  var map = new google.maps.Map(mapDiv, {
    center: {
      lat: 44.540,
      lng: -78.546
    },
    zoom: 8
  });

  ShelterGoogle.requestList(codeFellows, '98109', 16100, 'pet shelter', function(data) {
    var shelterList = data;
    console.log(data);
  })
  // var map2 = new google.maps.Map($('#map2')[0], {
  //   center: bhzc,
  //   zoom: 11
  // });
  // var request = {
  //   location: bhzc,
  //   radius: 16100,
  //   // type: 'veterinary_care',
  //   keyword: 'pet shelter'
  // };
  var infowindow = new google.maps.InfoWindow();

  // service = new google.maps.places.PlacesService(map2);
  // service.nearbySearch(request, callback);


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
