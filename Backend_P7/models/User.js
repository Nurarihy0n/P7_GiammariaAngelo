const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('User',{
    userId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    lastName: { type: Sequelize.STRING },
    firstName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    birthday: { type: Sequelize.DATE },
    moderateur: { type: Sequelize.BOOLEAN, defaultValue: false}
});

module.exports = User;