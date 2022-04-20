const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Like = require('./userLiked');
const ComReport = require('./ComReport');

const Commentaire = connection.define('Commentaire', {
    comId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    postId: { type: Sequelize.INTEGER,allowNull: false},
    content: { type: Sequelize.STRING},
    userId: { type: Sequelize.INTEGER,}
});

Commentaire.hasMany(Like, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Commentaire.hasMany(ComReport, {
    foreignKey: 'comId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Commentaire;