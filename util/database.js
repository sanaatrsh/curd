const Sequelize = require('sequelize');

const sequelize = new Sequelize('curd', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;