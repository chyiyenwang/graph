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

  populateSelect(Object.keys(countries));

  // // Creates the graph
  var vis = d3.select('#visualization');
  var width = 1000;
  var height = 500;
  var margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
    };
  var xRange = d3.scale.linear()
    .range([margins.left, width - margins.right])
    .domain([1990, 2013]);
  var yRange = d3.scale.linear()
    .range([height - margins.top, margins.bottom])
    .domain([0, .36]);
  var xAxis = d3.svg.axis()
    .scale(xRange)
    .tickSize(2)
    .tickSubdivide(true);
  var yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(2)
    .orient('left')
    .tickSubdivide(true);

  vis.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
    .call(xAxis);

  vis.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (margins.left) + ',0)')
    .call(yAxis);

  var lineFunction = d3.svg.line()
    .x(function(d) { return xRange(d.year) })
    .y(function(d) { return yRange(d.mean) })
    .interpolate('linear');

  vis.append('path')
    .attr('id', 'male-line')
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  vis.append('path')
    .attr('id', 'female-line')
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
});

// Populates the dropdown menu with the distinct countries listed in the CSV
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

// Calls the function to get the data when the dropdown menu changes countries
var changeCountry = function(country) {
  getData(country);
};

// Grabs the data for the specific country
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

  // // Creates the graph
  var vis = d3.select('#visualization')
  var width = 1000
  var height = 500
  var margins = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
    }
  var xRange = d3.scale.linear()
    .range([margins.left, width - margins.right])
    .domain([1990, 2013]);

  var yRange = d3.scale.linear()
    .range([height - margins.top, margins.bottom])
    .domain([0, .36]);

  // Creates the line
  var lineFunc = d3.svg.line()
    .x(function(d) { return xRange(d.year) })
    .y(function(d) { return yRange(d.mean) })
    .interpolate('linear');

  vis.select('#male-line')
    .transition()
    .duration(3000)
    .attr('d', lineFunc(male))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  vis.select('#female-line')
    .transition()
    .duration(3000)
    .attr('d', lineFunc(female))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}
