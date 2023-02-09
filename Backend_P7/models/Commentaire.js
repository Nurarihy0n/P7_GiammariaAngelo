const Sequelize = require('sequelize');
const connection = require('../database/connection');
const Like = require('./userLiked');
const ComReport = require('./ComReport');

const Commentaire = connection.define('Commentaire', {
    comId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    postId: { type: Sequelize.INTEGER,allowNull: false},
    content: { type: Sequelize.STRING, allowNull: false},
    userId: { type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Commentaire;