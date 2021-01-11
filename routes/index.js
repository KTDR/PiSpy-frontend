var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/dashboard');
})

router.get('/index', function(req, res) {
  res.redirect('/dashboard');
})

//Intercepting requests with .html to account for the way bootstrap studio exports links to pages, if 
//I have time I'll fix the links directly once a finished version is ready.
router.get('/index.html', function(req, res) {
  res.redirect('/dashboard');
})

router.get('/*.html', function(req, res) {
  res.r
  res.redirect(req.originalUrl.slice(0, req.originalUrl.length - 5));
})

module.exports = router;
