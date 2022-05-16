const jwt = require('jsonwebtoken');
require('dotenv').config();
const modelsPost = require('../models/modelsPost');
const User = require('../models/User');
const Comment = require('../models/Commentaire');


exports.postAuthor = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;

    let postId = req.params.postId;
    console.log(postId);
    let post = modelsPost.findByPk(postId)
        .then(post => {
            if (!post) return res.status(404).json({ message: " Post not found !" })
            if (post && post.userId !== userIdT) {
                throw 'Cet utilisateur n\'est pas authoriser a effectuer cette action';
            } else {
                next();
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request !' }));


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
                throw 'Cet utilisateur n\'est pas authoriser a effectuer cette action';
            } else {
                next();
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request' }))
}
