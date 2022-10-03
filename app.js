const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const sequelize = require('./util/database');
const userRoutes = require('./routes/curdRoute');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'views')));

app.use(userRoutes);
app.set('views', 'views');
app.set('view engine', 'ejs');

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
