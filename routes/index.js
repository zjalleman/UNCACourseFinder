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

var body = [];
var req = http.request(options, (res) => {
    //console.log(res);
    res.on('data', (chunk) => {
        //console.log(`BODY: ${chunk}`);
        body.push(chunk);
    });
    res.on('end', function() {
        /*body = Buffer.concat(body).toString();
        console.log(JSON.parse(body).length);
        var i;
        for (i = 0; i < JSON.parse(body).length; i++) {
            var qBody = JSON.parse(body)[i];
            
            connection.query('INSERT INTO `CourseInfo` (codeCourses,term,titleCourses,crn,hours,days,startTime,endTime,location,lmt,enr,wlCap,wlAct) VALUES("' + qBody.Code + '","' + qBody["Term Portion"] + '","' + qBody.Title + '",' + parseInt(qBody.CRN) + ',' + qBody["Maximum credit hours"] + ',"' + qBody.Days + '","' + qBody["Start time"] + '","' + qBody["End time"] + '","' + qBody.Location + '",' + qBody["Enrollment limit"] + ',' + qBody["Current enrollment"] + ',' + qBody["Waitlist total seats"] + ',' + qBody["Waitlist filled seats"] + ');', function(err, result) {
                if (err) throw err;
                //console.log(result.affectedRows);
            });
        }*/
        
        //console.log(qBody.Code);
        
        /*var text = "";
var x;
for (i = 0; i < csciArray.length; i++) {
    text += "<p> [" + i + "] ";
    for (x in csciArray[i]) {
        text += csciArray[i][x] + " ";
    }
    text += "</p>";
}*/
        
        connection.query('SELECT * FROM `CourseInfo`', function(err, rows, fields) {
            if (err) throw err;
            var text = "";
            var x;
            var j;
            for (j = 0; j < rows.length; j++) {
                text += "<p> [" + j + "] ";
                for (x in rows[j]) {
                    text += rows[j][x] + " ";
                }
                text += "</p>";
            }
            console.log(rows[0].codeCourses);
            router.get('/', function(req, res, next) {
                res.render('layout', { main: text});
            });
        });
    });
});

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

//connection.end();

/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('layout', { main: 'hi'});
});*/
    
module.exports = router;
