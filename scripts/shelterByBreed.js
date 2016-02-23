function ShelterBreed (opts) {
  Object.keys(opts).forEach(function(ele, index, keys) {
    this[ele] = opts[ele].$t;
  }, this);
}
