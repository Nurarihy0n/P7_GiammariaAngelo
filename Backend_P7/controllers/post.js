const Post = require('../models/modelsPost');
const fs = require('fs');
const User = require('../models/User');
const { STATUS_CODES } = require('http');
const { post } = require('../routes/post');

// Creation d'un post 
exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Post saved ! '}))
    .catch(error=> res.status(400).json({ error }));
};

//Read all post
exports.readAllPost = (req, res, next) => {
    Post.findAll()
    .then((posts) => res.status(200).json( posts ))
    .catch(error => res.status(400).json({ error, message: 'Post not fund !'}));
};

// Read only one post
exports.readOnePost = (req, res, next) => {
    const {postId} = req.params;
    Post.findByPk(postId)
    .then (post => { 
        if(!post) return res.status(404).json({ message: "Not found !"})
        res.status('200').json(post)})
    .catch(error => res.status(500).json({ error }))
};

// Update a post who exist
exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
    {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    console.log(JSON.stringify(postObject));
    console.log(req.params.postId);
    Post.update({ postId: req.params.postId}, { where: { ...postObject, postId: req.params.postId }})
        .then(() => res.status(201).json({ message: 'Post successfuly updated !' }))
        .catch(err => res.status(400).json({err, message: 'Something wrong with modification !'}));
};

//Delete a post
exports.deletePost = (req, res, next) => {
    const {postId} = req.params;
    Post.findByPk(postId)
    .then(post => {
        const filename = post.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { postId: req.params.postId }})
            .then(() => res.status(200).json({ msg: "Post deleted !"}))
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(err => res.status(500).json({ err }));
};