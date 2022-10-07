const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const sequelize = require('./util/database');

const app = express();

const userRouter = require('./routes/curdRoute');
app.use(bodyParser.json()); // application/json

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/api/", userRouter);

app.get("/", (req, res) => {
    res.json({
        "setup": [
            "cd server",
            "npm install",
            "npm start"
        ],
        "routes": [{
            "all": {
                "url": "http://localhost:8000/api/",
                "method": "GET",
                "status": {
                    "success": "200",
                }
            },
            "create": {
                "url": "http://localhost:8000/api/create",
                "method": "POST",
                "status": {
                    "success": "201",
                    "fail | validation error": "422"
                }
            },
            "delete": {
                "url": "http://localhost:8000/api/delete/:id",
                "method": "DELETE",
                "status": {
                    "success": "202",
                    "fail": "204"
                }
            },
            "edit": {
                "url": "http://localhost:8000/api/edit/:id",
                "method": "PUT",
                "status": {
                    "success": "200",
                    "fail | request created a new record": "201",
                    "fail | validation error": "422",
                }
            },
        }],
        "status": [{
            "200": "request succeeded",
            "201": "creation of a resource is succeeded",
            "202": "deleted successfully",
            "204": "deleted unsuccessfully",
            "422": "validation failed"
        }],
        "validate": {
            "name": "name.length >= 3",
            "email": "valid email",
            "mobile": "mobile.length >=7 && mobile.length <=15",
        }
    });
});

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
