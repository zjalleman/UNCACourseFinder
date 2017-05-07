var express = require('express');
var mysql = require('mysql');
var http = require('http');
var router = express.Router();

var options = {//course list connection info. Provided by Luke Withrow
    hostname: 'www3.unca.edu',
    port: 80, 
    path: '/schedules/dev/schedules-json.php?term=201710&department=ALL'
    //path: '/schedules/dev/schedules-json.php?term=201660&department=ALL'
};

var connection = mysql.createConnection({
    //host : 'aa1awz10v1nwj5i.cvqnt5evvmnu.us-east-1.rds.amazonaws.com',
	host : 'localhost',
    //user : 'zach',
	user : 'root',
    //password : 'uncacoursefinder',
	password : 'root',
    port : '3306',
    database : 'mydb'
});

connection.connect();

//req does all data manipulation and acquisition
//from UNCA Course List to Database
//and from Database to webapp.
var body = [];
var req = http.request(options, (res) => {
    res.on('data', (chunk) => {
        body.push(chunk);
    });
    res.on('end', function() {
        body = Buffer.concat(body).toString();
        console.log(JSON.parse(body).length);
        var i;
        
        //Insert statements for adding data to Database.
        //Only needed when rebuilding the Database.
        /*//begin comment
        for (i = 0; i < JSON.parse(body).length; i++) {
            var qBody = JSON.parse(body)[i];
            
            connection.query('INSERT IGNORE INTO `Departments` (nameDepartments) VALUES("' + qBody.Code.slice(0,5).replace(/[^a-zA-Z ]/g, "") + '");', function(err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
            
            console.log("Departments " + i);
        }
        
        for (i = 0; i < JSON.parse(body).length; i++) {
            var qBody = JSON.parse(body)[i];
            
            connection.query('INSERT IGNORE INTO `CourseInfo` (codeCourses,term,titleCourses,crn,hours,days,startTime,endTime,location,lmt,enr,wlCap,wlAct,idCourse,idDepartments) VALUES("' + qBody.Code + '","' + qBody["Term Portion"] + '","' + connection.escape(qBody.Title) + '",' + parseInt(qBody.CRN) + ',' + qBody["Maximum credit hours"] + ',"' + qBody.Days + '","' + qBody["Start time"] + '","' + qBody["End time"] + '","' + qBody.Location + '",' + qBody["Enrollment limit"] + ',' + qBody["Current enrollment"] + ',' + qBody["Waitlist total seats"] + ',' + qBody["Waitlist filled seats"] + ',' + i + ',' + '(SELECT idDepartments FROM Departments WHERE nameDepartments = "' + qBody.Code.slice(0,5).replace(/[^a-zA-Z ]/g, "") + '")' + ');', function(err, result) {
                if (err) {
                    console.log(err);
                    if (err.errno == 1064) {
                        console.log("adfasdf");
                    }
                    throw err;
                } 
                //console.log(result.affectedRows);
            });
            connection.query('INSERT IGNORE INTO `Instructors` (idInstructors, nameInstructors) VALUES(' + i + ', "' + qBody["Instructor(s)"] + '");', function(err, result) {
                if (err) throw err;
                //console.log(result.affectedRows);
            });
            
            console.log("Course & Instruct " + i);
        }
        
        for (i = 0; i < JSON.parse(body).length; i++) {
            var qBody = JSON.parse(body)[i];
            
            connection.query('INSERT IGNORE INTO `InstVsCourse` Values((SELECT idInstructors FROM Instructors WHERE nameInstructors = "' + qBody["Instructor(s)"] + '"),' + parseInt(qBody.CRN) + ');', function(err, result) {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
            
            console.log("IvC " + i);
        }
        //end comment*/
        console.log("Pulling from db");
        //Pulls the course info from the database
        //and stores it in variables to be sent
        //from server to webpage.
        connection.query('SELECT codeCourses, term, titleCourses, nameInstructors, CourseInfo.crn, hours, days, startTime, endTime, location, lmt, enr, wlCap, wlAct, nameDepartments FROM CourseInfo, Instructors, InstVsCourse, Departments WHERE CourseInfo.crn = InstVsCourse.crn AND Instructors.idInstructors = InstVsCourse.idInstructors AND CourseInfo.idDepartments = Departments.idDepartments ORDER BY `idCourse` ASC;', function(err, rows, fields) {
            console.log("hi");
            if (err) throw err;
            var text = new Array(rows.length);//stores each row of course data
            var dept = new Array();//stores department name abbreviations
            var prof = new Array();//stores instructor usernames
            var x;
            var j;
            var k;
            for (j = 0; j < rows.length; j++) {
                console.log(j);
                //text[j] = '[' + j + '] ';
                text[j] = '';
                for (x in rows[j]) {
                    text[j] += rows[j][x] + '_';
                }
            }
            for (j = 0; j < rows.length; j++) {
                var dupe = 0;
                for (k = 0; k < dept.length; k++) {
                    if (rows[j].nameDepartments === dept[k]) {
                        dupe = 1;
                    }
                }
                if (dupe === 0) {
                    dept.push(rows[j].nameDepartments);
                }
            }
            for (j = 0; j < rows.length; j++) {
                var dupe = 0;
                for (k = 0; k < prof.length; k++) {
                    if (rows[j].nameInstructors === prof[k]) {
                        dupe = 1;
                    }
                }
                if (dupe === 0) {
                    prof.push(rows[j].nameInstructors);
                }
            }
            console.log(rows[0].codeCourses);
            router.get('/', function(req, res, next) {
                res.render('layout', { main: text, deptList: dept, profList: prof});
                console.log('done');
            });
        });
    });
});

req.end();
module.exports = router;