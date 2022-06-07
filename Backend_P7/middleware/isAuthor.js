const jwt = require('jsonwebtoken');
require('dotenv').config();
const modelsPost = require('../models/modelsPost');
const User = require('../models/User');
const Comment = require('../models/Commentaire');


async function isModerator(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let returnValue = false;
    let userIdM = await User.findByPk(userIdT)
        .then(user => {
            if (!user) throw "User not found"
            if (user && user.moderateur !== true) {
                returnValue = false;
            } else {
                returnValue = true
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at isModerator!' }));

    return returnValue;
}

async function isAuthor(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let postId = req.params.postId;
    let returnValue = false;
    let post = await modelsPost.findByPk(postId)
        .then(post => {
            ;
            if (!post) throw "Post not found"
            if (post && post.userId !== userIdT) {
                returnValue = false;
            } else {
                returnValue = true
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at isAuthor!' }));

    return returnValue;
}

async function isCommentAuthor(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userIdT = decodedToken.userId;
    let comment = await Comment.findByPk(req.params.comId)
        .then(comment => {
            if (!comment) throw "Comment not found"
            if (comment && comment.userId !== userIdT) {
                returnValue = false;
            } else {
                returnValue = true
            }
        })
        .catch(error => res.status(401).json({ error: error, message: 'Invalid request at commentAuthor' }))

        return returnValue;
}

exports.postAuthor = async (req, res, next) => {

    let author = await isAuthor(req);
    let moderator = await isModerator(req);
    if (author || moderator) {
        next();
    } else {
        return res.status(401).json({ message: 'Non autoriser !' });
    }
}

exports.commentAuthor = async (req, res, next) => {    

    let moderator = await isModerator(req);
    let commentAuthor = await isCommentAuthor(req);
    console.log(commentAuthor, 'commentAuthor(1)');
    console.log(moderator, 'commentAuthor(2)');
    if (commentAuthor || moderator) {
        next();
    } else {
        return res.status(401).json({ message: 'Non autoriser !' });
    }
}
