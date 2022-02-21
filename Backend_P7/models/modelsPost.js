const Sequelize = require('sequelize');
const connection = require('../database/connection');
const userLiked = require('./userLiked');

const modelsPost = connection.define('modelsPost', {
    postId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true }, 
    userId: { type: Sequelize.INTEGER, allowNull: false},
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    imageUrl: { type: Sequelize.STRING},
    postDate: { type: Sequelize.INTEGER }
});

modelsPost.hasMany(userLiked, {
    foreignKey: 'userId, postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
userLiked.belongsTo(modelsPost);




module.exports = modelsPost;