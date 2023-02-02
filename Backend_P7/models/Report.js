const Sequelize = require('sequelize');
const connection = require('../database/connection');
const User = require('./User')

const Report = connection.define('Report', {
    reportId : {type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    postId: { type: Sequelize.INTEGER, allowNull: false, unique: 'composite_key'},
    userId: { type: Sequelize.INTEGER, allowNull: false, unique: 'composite_key'},
    content: { type: Sequelize.STRING },
    aboutReport: { type: Sequelize.VIRTUAL,
    get() {
        return `${this.postId}`
    }}
});


module.exports = Report;