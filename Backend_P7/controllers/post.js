const Post = require('../models/modelsPost');
const fs = require('fs');
const User = require('../models/User');
const { STATUS_CODES } = require('http');
const { post } = require('../routes/post');
const { title } = require('process');
const userLiked = require('../models/userLiked')

// Creation d'un post 
exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post saved ! ' }))
        .catch(error => res.status(400).json({ error }));
};

//Read all post
exports.readAllPost = (req, res, next) => {
    Post.findAll()
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error, message: 'Post not fund !' }));
};

// Read only one post
exports.readOnePost = (req, res, next) => {
    const { postId } = req.params;
    Post.findByPk(postId)
        .then(post => {
            if (!post) return res.status(404).json({ message: "Not found !" })
            res.status('200').json(post)
        })
        .catch(error => res.status(500).json({ error }))
};

// Update a post who exist
exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    console.log(req.body);
    Post.update({ ...postObject}, { where: { postId: req.params.postId } })
        .then(() => res.status(201).json({ message: 'Post successfuly updated !' }))
        .catch(err => res.status(400).json({ err, message: 'Something wrong with modification !' }));
};

//DELETE A POST
exports.deletePost = (req, res, next) => {
    const { postId } = req.params;
    Post.findByPk(postId)
        .then(post => {
            console.log(post.imageUrl);
            if (post.imageUrl == null) {
                Post.destroy({ where: { postId: postId }, force: true })
                .then(() => res.status(200).json({ msg: "Post has been deleted !" }))
                .catch(error => res.status(400).json({ msg: 'Post can\' get be deleted !', error }));
            } else {
                const filename = post.imageUrl.split('/images')[1];
                try {
                    fs.unlink(`images/${filename}`, () => {
                        Post.destroy({ where: { postId: postId }, force: true })
                            .then(() => res.status(200).json({ msg: "Post + image has been deleted !" }))
                            .catch(error => res.status(400).json({ msg: 'Post with image can\' get be deleted !', error }));
                    })
                } catch (error) {
                    console.log('Erreur pour supprimer le post avec l\image');
                }
            }
        })
        .catch(err => res.status(500).json({ msg: 'erreur', err }));
}




/********* CRUD TERMINE *********/

// ||||||||||| CONTROLLERS |||||||||||||| 
// VVVVVVVVVVV    LIKES    VVVVVVVVVVVVVV

exports.likeDislike = (req, res, next) => {
    let userId = req.body.userId;
    let like = req.body.like;
    const {postId} = req.params;
    console.log(userId);
    console.log(like);
    console.log(postId);
    let post = Post.findByPk(postId)
    .then( post => {
        if(like == 1){
            Post.update({ postId }),
            { $push: { userLiked: userId, postId }, $inc: { likes:1 }}
            .then(() => res.status(200).json({ msg: "Post liked !"}))
            .catch(err => res.status(400).json({ err: "Post can't be liked !"}))
        }
    })
    .catch(error => res.status(500).json({ error, msg: 'Probleme avec like/dislike' }));

}