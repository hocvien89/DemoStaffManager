var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var sql = require("mssql");
const config = {
    user: 'sa',
    password: '123456a@',
    server: '172.16.18.191', // You can use 'localhost\\instance' to connect to named instance
    database: 'DemoStaffManager',
    port: 1433,

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

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
    var employeeCd = req.header.employeeCd;
    console.log(req.header);
    if(employeeCd === undefined) return res.send("error");
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('select * from staffs where staff_cd ='+employeeCd)
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
});

app.get('/getEmployeeList', async function (req, res) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('select * from staffs')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
})

app.get('/getDevLanguage', async function (req, res) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('select * from dev_language')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
})

app.post('/addEmployee', function (req, res, next) {
    var param = req.body;
    console.log(param.staff_name);
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
            .input('staff_name', sql.NVarChar, param.staff_name)
            .input('address', sql.NVarChar,param.address)
            .query("Insert into staffs (staff_name, address) OUTPUT INSERTED.staff_cd values(@staff_name, @address) ",param)
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
    res.status(200).send({ success: true, message: 'Thành công', data: param });
})

app.get('/countDevByLanguage', async function (req, res) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('SELECT dv.dev_language,COUNT(*) as total FROM dev_language dv LEFT JOIN staffs s ON dv.dev_lang_cd = s.dev_lang_cd GROUP BY dv.dev_lang_cd,dv.dev_language')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
})

var server = app.listen(8085, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("server is running...");
})