const Sequelize = require('sequelize');
const connection = require('../database/connection');
const modelsPost = require('./modelsPost');
const Commentaire = require('./Commentaire');
const userLiked = require('./userLiked');

const User = connection.define('User',{
    userId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    lastName: { type: Sequelize.STRING },
    firstName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    birthday: { type: Sequelize.DATE },
    moderateur: { type: Sequelize.BOOLEAN, defaultValue: false}
});

User.hasMany(modelsPost);
modelsPost.belongsTo(User);

User.hasMany(Commentaire);
Commentaire.belongsTo(User);

User.hasMany(userLiked);
userLiked.belongsTo(User);



module.exports = User;