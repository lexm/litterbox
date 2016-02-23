function Shelter(opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele].$t;
  }, this);
}

Shelter.all = [];

Shelter.requestShelterList = function(location, callback) {
  var petFinderApi = 'http://api.petfinder.com/shelter.find?format=json&key='
    + petFinderKey + '&animal=cat&location=' + location +'&callback=?';
  $.getJSON(petFinderApi)
    .done(function(petApiData) {callback(petApiData);})
    .error(function(err) {console.log('Error: ' + JSON.stringify(err));});
}

Shelter.requestShelterList('98026', function(data) {
  var shelterList = data.petfinder.shelters.shelter;
  Shelter.loadAll(shelterList);
});

Shelter.loadAll = function(list) {
  Shelter.all = list.map(function(ele) {
    console.log(ele);
    console.log(ele.$t);
    return new Shelter(ele);
  })
}
