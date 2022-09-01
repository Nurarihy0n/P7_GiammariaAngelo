const Sequelize = require('sequelize');
const connection = require('../database/connection');
const userLiked = require('./userLiked');
const Commentaire = require('./Commentaire');
const Report = require('./Report');

const modelsPost = connection.define('modelsPost', {
    postId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true }, 
    userId: { type: Sequelize.INTEGER, allowNull: false},
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    image: { type: Sequelize.STRING},
    postDate: { type: Sequelize.INTEGER }
});

modelsPost.hasMany(userLiked, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

modelsPost.hasMany(Commentaire, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

modelsPost.hasMany(Report, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




module.exports = modelsPost;