const Sequelize = require('sequelize');
const connection = require('../database/connection');
const modelsPost = require('./modelsPost');
const Commentaire = require('./Commentaire');
const userLiked = require('./userLiked');
const Report = require('./Report');

const User = connection.define('User',{
    userId: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    lastName: { type: Sequelize.STRING },
    firstName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, allowNull: false, unique: true},
    password: {type: Sequelize.STRING, allowNull: false},
    birthday: { type: Sequelize.DATE },
    moderateur: { type: Sequelize.BOOLEAN, defaultValue: false}
});



User.hasMany(modelsPost, {
    foreignKey: 'userId' 
});

User.hasMany(Commentaire, {
    foreignKey: 'userId' 
});

User.hasMany(userLiked, {
    foreignKey: 'userId' 
});

User.hasMany(Report, {
    foreignKey: 'userId'
});




module.exports = User;