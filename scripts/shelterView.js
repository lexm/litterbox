shelterView = {};

var renderShelter = function(shelter) {
  var template = Handlebars.compile($('#shelter-template').text());
  return template(shelter);
}

shelterView.index = function() {
  Shelter.all.forEach(function(shelter) {
    $('#shelters').append(renderShelter(shelter));
  });
}
