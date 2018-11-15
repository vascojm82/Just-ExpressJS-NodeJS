var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // const date = new Date(1969,6,20);
  // res.set('Date', date);    //Changing the date header on the html response
  // res.set('Cache-Control', 'no-store');  //Tell receiving browser not to store anything in the cache
  // res.set('Content-Type', 'text/html');
  // rese.type('text/html');
  //fresh and stale
  // console.log(req.fresh);
  // console.log(req.stale);
  // console.log(req.accepts('html'));
  res.render('index', { title: 'Express' });
});

module.exports = router;
