var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'UNCACourseFinder' });
});*/

router.get('/', function(req, res, next) {
    res.sendFile('testViews/index.html');
});
    
module.exports = router;
