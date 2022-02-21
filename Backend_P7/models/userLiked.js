const Sequelize = require('sequelize');
const connection = require('../database/connection');
const modelsPost = require('./modelsPost');

const userLiked = connection.define('userLiked', {
    userId: { type: Sequelize.INTEGER},
    postId: { type: Sequelize.INTEGER},
    liked: { type: Sequelize.INTEGER}
});



module.exports = userLiked;







// userId: OneToMany
// postId: OneToMany

// userId et postId: PrimaryKey : clé primaire composée


// Arsène like (+1) le post 1
like = {
    userId: 1,
    postId: 1,
    liked: 1
}

// Arsène dislike (-1) le post
dislike = {
    userId: 1,
    postId: 1,
    liked: 0
}

// Arsène dislike (-1) le post
dislike2 = {
    userId: 1,
    postId: 1,
    liked: -1
}




