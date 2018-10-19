var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var sql = require("mysql");
const config = {
    user: 'root',
    password: 'root',
    host: '18.223.101.113', // You can use 'localhost\\instance' to connect to named instance
    database: 'demostaffmanager',
    port: 3306,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
// const config ='mysql://test:123456@18.223.101.113:3306/demostaffmanager'
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/getEmployeeById', function (req, res) {
    var employeeCd = req.query.id;
    console.log(employeeCd);
    if (employeeCd === undefined) return res.send("error");
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('select * from staffs where staff_cd =' + employeeCd, (err, rows) => {
            if (err) {
                console.log(err);
                connection.end();
                return res.status(501).send(err);
            }
            console.log(rows);
            res.send(rows);
        });
        connection.end();
    });
});

app.get('/getEmployeeList', async function (req, res) {
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('select * from staffs', (err, rows) => {
            if (err) {
                connection.end();
                return reject(err);
            }
            res.send(rows);
        });
        connection.end();
    });
})

app.get('/getDevLanguage', async function (req, res) {
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('select * from dev_language', (err, rows) => {
            if (err) {
                console.log(err);
                connection.end();
                return res.status(501).send(err);
            }
            console.log(rows);
            res.send(rows);
        });
        connection.end();
    });
})

app.post('/addEmployee', function (req, res, next) {
    var param = req.body;
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('Insert into staffs (staff_name, address, email, phone_number, sex, dev_lang_cd) values("' +
            param.staff_name +' ","' + param.address + '","' + param.email + '","' + param.phone_number + '",' + param.sex + ',' + param.dev_lang_cd + ')', (err, rows) => {
                if (err) {
                    console.log(err);
                    connection.end();
                    return res.status(501).send(err);
                }
                console.log(rows);
                res.send(rows);
            });
        connection.end();
    });
})

app.post('/editEmployee', function (req, res, next) {
    var param = req.body;
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('UPDATE staffs SET ' +
            'staff_name = "' + param.staff_name + '",' +
            'address = "' + param.address + '",' +
            'email = "' + param.email + '",' +
            'phone_number = "' + param.phone_number + '",' +
            'sex = ' + param.sex + ',' +
            'dev_lang_cd = ' + param.dev_lang_cd + ',' +
            'start_date = "' + param.start_date + '",' +
            'end_date = "' + param.end_date + '" where staff_cd = ' + param.staff_cd, (err, rows) => {
                if (err) {
                    console.log('err: ', err);
                    connection.end();
                    return res.status(501).send(err);
                }
                console.log(rows);
                res.send({ success: true, message: 'Thành công' });
            });
        connection.end();
    });
})

app.get('/countDevByTime', async function (req, res) {
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('SELECT YEAR(start_date) as startYear,COUNT(*) as total FROM staffs GROUP BY YEAR(start_date)', (err, rows) => {
            if (err) {
                console.log(err);
                connection.end();
                return res.status(501).send(err);
            }
            console.log(rows);
            res.send(rows);
        });
        connection.end();
    });
})

app.get('/countDevByLanguage', async function (req, res) {
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('SELECT dv.dev_language,COUNT(*) as total FROM dev_language dv LEFT JOIN staffs s ON dv.dev_lang_cd = s.dev_lang_cd GROUP BY dv.dev_lang_cd,dv.dev_language', (err, rows) => {
            if (err) {
                console.log(err);
                connection.end();
                return res.status(501).send(err);
            }
            console.log(rows);
            res.send(rows);
        });
        connection.end();
    });
})

app.post('/deleteEmployee', function (req, res, next) {
    var param = req.body;
    console.log(param);
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('staff_cd', sql.NVarChar, param.staff_cd)
                .query("DELETE staffs WHERE staff_cd = @staff_cd", param)
        }).then(result => {
            res.status(200).send({ success: true, message: 'delete employee success', data: param });
            sql.close();
        }).catch(err => {
            reject(err)
            sql.close();
        });
    });
})

app.get('/countStaffByTime', async function (req, res) {
    return new Promise((resolve, reject) => {
        var connection = sql.createConnection(config);
        connection.connect();
        connection.query('SELECT dv.dev_language,COUNT(*) as total FROM dev_language dv LEFT JOIN staffs s ON dv.dev_lang_cd = s.dev_lang_cd GROUP BY dv.dev_lang_cd,dv.dev_language', (err, rows) => {
            if (err) {
                console.log(err);
                connection.end();
                return res.status(501).send(err);
            }
            console.log(rows);
            res.send(rows);
        });
        connection.end();
    });

})

var server = app.listen(8085, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("server is running...");
})