// (function(module) {
//
// })

function Breed(opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  },this);
}

function Shelter(opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele];
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
  console.log(data.petfinder.shelters.shelter);
});

var breedView = {};

var render = function(breed) {
  return $('<li>').text(breed);
}

Breed.all = [];

Breed.requestBreeds = function(callback) {
  var petFinderApi = 'http://api.petfinder.com/breed.list?format=json&key=' + petFinderKey + '&animal=cat&location=98026&callback=?'
  $.getJSON(petFinderApi)
    .done(function(petApiData) {callback(petApiData);})
    // .done(function(petApiData) {console.log('petApiData is'); console.log(petApiData);})
    .error(function(err) {console.log('Error: ' + err);});
}

Breed.loadAll = function(list) {
  Breed.all = list.map(function(ele) {
    return ele.$t
  })
}

Breed.requestBreeds(function(data){
  var breedList = data.petfinder.breeds.breed;
  Breed.loadAll(breedList);
});

breedView.index = function(breedArray) {
  Breed.all.forEach(function(breed) {
    console.log(breed);
    console.log(render(breed));
    $('#breeds').append(render(breed));
  });
}


breedView.index();
