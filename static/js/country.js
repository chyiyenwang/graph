var countryData;

d3.csv("countryData.csv", function(d) {
  if (d.metric == 'obese' && d.age_group_id == 36) {
    return {
      location_name: d.location_name,
      sex: d.sex,
      year: +d.year,
      mean: +d.mean,
    };
  };
}, function(data) {
  countryData = data;
  // Puts distinct country names into an array
  var countries = {};

  var countryList = data.map(function(country) {
    return country.location_name;
  })

  for (var i = 0; i < countryList.length; i++) {
    countries[countryList[i]] = null;
  };

  // Populate the Select dropdown
  populateSelect(Object.keys(countries));
});

var populateSelect = function(data) {
  var select = document.getElementById('selectCountry');

  for(var i = 0; i < data.length; i++) {
    var opt = data[i];
    var element = document.createElement('option');

    element.textContent = opt;
    element.value = opt;
    select.appendChild(element);
  };
};

var changeCountry = function(country) {
  getData(country);
};

var getData = function(name) {
  var male = [];
  var female = [];

  countryData.forEach(function(country) {
    if (country.location_name == name && country.sex == 'male') {
      male.push(country);
    };
  });
  countryData.forEach(function(country) {
    if (country.location_name == name && country.sex == 'female') {
      female.push(country);
    };
  });

  console.log(male);
  console.log(female);
}
