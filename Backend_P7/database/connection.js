const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize ("groupomania", 'root', process.env.DB_MYSQL_PASSWORD, {
    host: process.env.DB_HOST_LOG,
    dialect: "mysql",
    operatorsAliases: 0
});


module.exports = sequelize;
global.sequelize = sequelize;