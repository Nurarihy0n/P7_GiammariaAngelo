const Sequelize = require('sequelize');
const connection = require('../database/connection');

const modelsPost = connection.define('modelsPost', {
    postId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true }, 
    userId: { type: Sequelize.INTEGER, allowNull: false},
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    postDate: { type: Sequelize.INTEGER },
    like: { type: Sequelize.INTEGER, default: 0},
    dislikes: { type: Sequelize.INTEGER, default: 0}
});

module.exports = modelsPost;