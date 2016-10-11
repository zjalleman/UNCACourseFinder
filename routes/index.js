var express = require('express');
var mysql = require('mysql');
var http = require('http');
var router = express.Router();

var options = {
    hostname: 'www3.unca.edu',
    port: 80, 
    path: '/schedules/dev/schedules-json.php?term=201660&department=CSCI'
};

var connection = mysql.createConnection({
    host : 'zprojectdb.cvqnt5evvmnu.us-east-1.rds.amazonaws.com',
    user : 'zach',
    password : 'uncacoursefinder',
    database : 'mydb'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.query('SHOW TABLES IN mydb', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows);
});

var req = http.request(options, (res) => {
    //console.log(res);
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

//console.log(req.response);
req.end();

/*router.get('http://www3.unca.edu/schedules/dev/schedules-json.php?term=201660&department=CSCI', function(req, res, next) {
    console.log(res.toString);
});*/

/*var main = function() {
    var url = 'http://www3.unca.edu/schedules/dev/schedules-json.php?term=201660&department=CSCI';
    $.getJSON(url, function(uncaResponse) {
        console.log(uncaResponse);
        var $schedTable = $('<table>');
    });
};*/

connection.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'UNCACourseFinder' });
});
    
module.exports = router;
