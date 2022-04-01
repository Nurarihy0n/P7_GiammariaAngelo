const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Commentaire = connection.define('Commentaire', {
    comId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    postId: { type: Sequelize.INTEGER,allowNull: false},
    content: { type: Sequelize.STRING},
    userId: { type: Sequelize.INTEGER,}
});

module.exports = Commentaire;