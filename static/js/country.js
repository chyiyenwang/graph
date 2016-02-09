d3.csv("countryData.csv", function(d) {
  if (d.metric == 'obese' && d.age_group_id == 36) {
    return {
      location_name: d.location_name,
      sex: d.sex,
      year: +d.year,
      mean: +d.mean,
    };
  }
}, function(data) {
  var male = [];
  var female = [];

  data.forEach(function(country) {
    if (country.location_name == 'China' && country.sex == 'male') {
      male.push(country);
    }
  })
  data.forEach(function(country) {
    if (country.location_name == 'China' && country.sex == 'female') {
      female.push(country);
    }
  })

  console.log(male);
  console.log(female);
});

