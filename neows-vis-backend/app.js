var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors'); // Needed to avoid CORS issues

var apiRouter = require('./routes/neows-api');

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', apiRouter);

app.use('/', function(req, res){
  res.send({'message': 'The Neows API is located at /api/'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error message
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
