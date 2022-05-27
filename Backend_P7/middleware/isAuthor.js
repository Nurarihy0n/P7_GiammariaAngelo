const jwt = require('jsonwebtoken');
require('dotenv').config();
const modelsPost = require('../models/modelsPost');
const User = require('../models/User');
const Comment = require('../models/Commentaire');


//function si auteur return true 
//function si moderateur return true 
//Jeu entre if else 

function isModerator(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let returnValue = false;
    let userIdM = User.findByPk(userIdT)
        .then(user => {
            if (!user) throw "User not found"
            if (user && user.moderateur !== true) {
                returnValue = false;
            } else {
                returnValue = true;
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at postAuthor!' }));
}

function isAuthor(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let postId = req.params.postId;
    let returnValue = false;
    let post = modelsPost.findByPk(postId)
        .then(post => {
            console.log(post.userId);
            console.log(userIdT);
            if (!post) throw "Post not found"
            if (post && post.userId !== userIdT) {
                returnValue = false;
            } else {
                returnValue = true
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at postAuthor!' }));

    return returnValue;
}

exports.postAuthor = (req, res, next) => {

    let author = isAuthor(req);
    let moderator = isModerator(req);
    console.log(author);
    console.log(moderator);
    if (author || moderator) {
        next();
    } else {
        return res.status(401).json({ message: 'Non autoriser !' });
    }

}

exports.commentAuthor = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let comId = req.params.comId;
    let comment = Comment.findByPk(comId)
        .then(comment => {
            if (!comment) return res.status(404).json({ message: "Comment not found !" })
            if (comment && comment.userId !== userIdT) {
                throw 'Non authoriser n\'etant pas l\'autheur de ce commentaire';
            } else {
                next();
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at commentAuthor' }))
}
