const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Report = connection.define('Report', {
    reportId : {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    postId: { type: Sequelize.INTEGER, allowNull: false, unique: 'composite_key'},
    userId: { type: Sequelize.INTEGER, allowNull: false, unique: 'composite_key'},
    content: { type: Sequelize.STRING }
});


module.exports = Report;