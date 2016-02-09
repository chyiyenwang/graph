var countryData;

// // Creates and defines the dimensions of the graph
var vis = d3.select('#visualization');
var width = 1000;
var height = 500;
var margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 100
  };
var line = [
  {year: 1990, mean: 0}, {year: 1991, mean: 0}, {year: 1992, mean: 0},
  {year: 1993, mean: 0}, {year: 1994, mean: 0}, {year: 1995, mean: 0},
  {year: 1996, mean: 0}, {year: 1997, mean: 0}, {year: 1998, mean: 0},
  {year: 1999, mean: 0}, {year: 2000, mean: 0}, {year: 2001, mean: 0},
  {year: 2002, mean: 0}, {year: 2003, mean: 0}, {year: 2004, mean: 0},
  {year: 2005, mean: 0}, {year: 2006, mean: 0}, {year: 2007, mean: 0},
  {year: 2008, mean: 0}, {year: 2009, mean: 0}, {year: 2010, mean: 0},
  {year: 2011, mean: 0}, {year: 2012, mean: 0}, {year: 2013, mean: 0}
];

// Sets the X range of the graph
var xRange = d3.scale.linear()
  .range([margin.left, width - margin.right])
  .domain([1990, 2013]);

// Sets the Y range of the graph
var yRange = d3.scale.linear()
  .range([height - margin.top, margin.bottom])
  .domain([0, 0.36]);

// Defines the X axis
var xAxis = d3.svg.axis()
  .scale(xRange)
  .tickSize(2)
  .tickPadding(10)
  .tickFormat(d3.format('d'));

// Defines the Y axis
var yAxis = d3.svg.axis()
  .scale(yRange)
  .tickSize(2)
  .orient('left')
  .tickPadding(10);

// Draws X axis
vis.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
  .call(xAxis);

// Draws Y axis
vis.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + (margin.left) + ',0)')
  .call(yAxis);

// Defines the line
var lineFunc = d3.svg.line()
  .x(function(d) { return xRange(d.year) })
  .y(function(d) { return yRange(d.mean) })
  .interpolate('linear');

// Creates the male and female lines to be updated later
vis.append('path')
  .attr('d', lineFunc(line))
  .attr('id', 'male-line')
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none')

vis.append('path')
  .attr('d', lineFunc(line))
  .attr('id', 'female-line')
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// Gets data
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

  populateSelect(Object.keys(countries).sort());
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

// Grabs the data for the specific country
var changeCountry = function(name) {
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

  // Draws the line for males
  vis.select('#male-line')
    .transition()
    .duration(3000)
    .attr('d', lineFunc(male))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  // Draws the line for females
  vis.select('#female-line')
    .transition()
    .duration(3000)
    .attr('d', lineFunc(female))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
};