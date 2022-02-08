const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Commentaire = connection.define('Commentaire', {
    comId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    content: { type: Sequelize.STRING},
    postId: { type: Sequelize.INTEGER,allowNull: false},
    userId: { type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Commentaire;