var breeds = {};

breeds.all = [];

breeds.requestBreeds = function(callback) {
  var PetFinderApi = 'http://api.petfinder.com/breed.list?format=json&key=' + petFinderKey + '&animal=cat&location=98026&callback=?'
  $.getJSON(PetFinderApi)
    .done(function(petApiData) {callback(petApiData);})
    // .done(function(petApiData) {console.log('petApiData is'); console.log(petApiData);})
    .error(function(err) {console.log('Error: ' + err);});
}

breeds.requestBreeds(function(data){
  $('main').html('Hello');
  console.log(data);
});
