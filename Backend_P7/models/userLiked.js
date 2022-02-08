const Sequelize = require('sequelize');
const connection = require('../database/connection');

const userLiked = connection.define('userLiked', {
    userId: { type: Sequelize.INTEGER},
    postId: { type: Sequelize.INTEGER}
});

module.exports = userLiked;