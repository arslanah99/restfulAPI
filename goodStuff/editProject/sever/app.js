var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();


// catch 404 and forward to error handler
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  next();
});
app.use(bodyParser.json())



app.use(logger('dev'));
app.use('/', indexRouter);

app.listen(9001);


module.exports = app;
