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
    var employeeCd = req.query.id;
    console.log(employeeCd);
    if (employeeCd === undefined) return res.send("error");
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('select * from staffs where staff_cd =' + employeeCd)
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {
            res.send("error");
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
                .input('address', sql.NVarChar, param.address)
                .input('email', sql.NVarChar, param.email)
                .input('phone_number', sql.NVarChar, param.phone_number)
                .input('sex', sql.Int, param.sex)
                .input('dev_lang_cd', sql.Int, param.dev_lang_cd)
                .query("Insert into staffs (staff_name, address, email, phone_number, sex, dev_lang_cd) OUTPUT INSERTED.staff_cd values(@staff_name, @address, @email, @phone_number, @sex, @dev_lang_cd) ", param)
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

app.post('/editEmployee', function (req, res, next) {
    var param = req.body;
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('staff_cd', sql.NVarChar, param.staff_cd)
                .input('staff_name', sql.NVarChar, param.staff_name)
                .input('address', sql.NVarChar, param.address)
                .input('email', sql.NVarChar, param.email)
                .input('phone_number', sql.NVarChar, param.phone_number)
                .input('sex', sql.Int, param.sex)
                .input('dev_lang_cd', sql.Int, param.dev_lang_cd)
                .input('start_date', sql.Date, param.start_date)
                .input('end_date', sql.Date, param.end_date)
                .query("UPDATE [dbo].[staffs] SET staff_name = @staff_name,address = @address,email = @email,phone_number=@phone_number,sex =@sex,dev_lang_cd=@dev_lang_cd,start_date=@start_date,end_date=@end_date WHERE staff_cd = @staff_cd", param)
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {
            res.send({ success: false, message: 'error'});
            reject(err)
            sql.close();
        });
    });
    res.status(200).send({ success: true, message: 'Thành công', data: param });
})

app.get('/countDevByTime', async function (req, res) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('SELECT YEAR(start_date) as startYear,COUNT(*) as total FROM staffs GROUP BY YEAR(start_date)');
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
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
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query('select datepart(yyyy, start_date) as years, count (staff_cd) as counts from staffs group by datepart(yyyy, start_date)')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });

})


app.post('/projectRegister', function (req, res, next) {
    var param = req.body;
    console.log(param.project_name);
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('project_name', sql.NVarChar, param.project_name)
                .input('type', sql.Int, param.type)
                .input('discription', sql.NVarChar, param.discription)
                .input('date_start', sql.Date, param.date_start)
                .input('date_end', sql.Date, param.date_end)
                .input('ins_user', sql.Int, param.ins_user)
                .execute('proc_InsertProject')
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

app.get('/getProjectList', async function (req, res) {
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().execute('[dbo].[proc_GetListProject]')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {

            reject(err)
            sql.close();
        });
    });
})


app.post('/editProject', function (req, res, next) {
    var param = req.body;
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('project_cd', sql.Int, param.project_cd)
                .input('project_name', sql.NVarChar, param.project_name)
                .input('type', sql.Int, param.type)
                .input('discription', sql.NVarChar, param.discription)
                .input('date_start', sql.Date, param.date_start)
                .input('date_end', sql.Date, param.date_end)
                .input('upd_user', sql.Int, param.upd_user)
                .execute('[dbo].[proc_EditProject]')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {
            res.send({ success: false, message: 'error'});
            reject(err)
            sql.close();
        });
    });
    res.status(200).send({ success: true, message: 'Thành công', data: param });
})

app.post('/deleteProject', function (req, res, next) {
    var param = req.body;
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request()
                .input('project_cd', sql.Int, param.project_cd)
                .execute('proc_DeleteProject')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {
            res.send({ success: false, message: 'error'});
            reject(err)
            sql.close();
        });
    });
    res.status(200).send({ success: true, message: 'Thành công', data: param });
})


app.get('/getProjectById', function (req, res) {
    var project_cd = req.query.id;
    console.log(project_cd);
    if (project_cd === undefined) return res.send("error");
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().input('project_cd', sql.Int, project_cd).execute('proc_GetProjectById')
        }).then(result => {

            res.send(result.recordset);

            sql.close();
        }).catch(err => {
            res.send("error");
            reject(err)
            sql.close();
        });
    });
});


var server = app.listen(8085, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("server is running...");
})