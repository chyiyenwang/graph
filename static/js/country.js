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

  // var male = [];
  // var female = [];

  // data.forEach(function(country) {
  //   if (country.location_name == 'China' && country.sex == 'male') {
  //     male.push(country);
  //   }
  // })
  // data.forEach(function(country) {
  //   if (country.location_name == 'China' && country.sex == 'female') {
  //     female.push(country);
  //   }
  // })

  // console.log(male);
  // console.log(female);
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

function changeCountry(country) {
  alert(document.getElementsByTagName('option').value);
};

