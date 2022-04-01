const Sequelize = require('sequelize');
const connection = require('../database/connection');
const modelsPost = require('./modelsPost');

const userLiked = connection.define('userLiked', {
    userId: { type: Sequelize.INTEGER, unique: 'composite_key'},
    postId: { type: Sequelize.INTEGER, unique: 'composite_key'},
    liked: { type: Sequelize.INTEGER}
});



module.exports = userLiked;



