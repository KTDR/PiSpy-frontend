var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');  //Import routes for "dashboard" area of site

var app = express();

app.use('*/assets', express.static(path.join(__dirname, 'assets'))); //Add static assets to middleware chain
//Wildcard might not be safe but I have spent too long on this issue and can't find a better solution online for routing to static resources
//https://stackoverflow.com/questions/28680738/exclude-sub-directory-from-static-files-in-express

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter); //Add routes to middleware chain

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); 
  res.render('404');
});


module.exports = app;