var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;

app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, '/static')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('port: ' + port)
})