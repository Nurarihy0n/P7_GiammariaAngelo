const Post = require('../models/modelsPost');
const fs = require('fs');
const User = require('../models/User');
const { STATUS_CODES } = require('http');
const { post } = require('../routes/post');
const { title } = require('process');
const userLiked = require('../models/userLiked');
const Commentaire = require('../models/Commentaire');
const { json } = require('express/lib/response');

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
    Post.update({ ...postObject }, { where: { postId: req.params.postId } })
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

exports.likeDislike = async (req, res, next) => {
    
    // 1. Si'utilisateur n'a pas encore liké le post, alors je crée un like dans la table userLiked


    // 2. Si l'utilisateur a déjà liké le post, alors, on ne fait rien


    // 3. Si l'utilisateur veut disliker un post, alors s'il n'a pas liké, alors je créé un dislike 


    // 4. Si l'utilisateur veut disliker un post, et s'il a déjà liké ce post, alors son like est annulé


    // 5. Si l'utilisateur veut disliker un post, et s'il a déjà disliké ce post, alors on ne fait rien

    let userId = req.body.userId;
    let likeOrDislike = req.body.like;
    const { postId } = req.params;
    console.log(userId);
    console.log(likeOrDislike);
    console.log(postId);

    let userLike = await userLiked.findOne({ where: { userId: userId, postId: postId } });
    // cree l'utilisateur qui like dans la bdd
    if (likeOrDislike == 1) {
        if (userLike == null) {
            try {
                const like = await new userLiked({
                    "userId": userId,
                    "postId": postId,
                    "liked": 1
                }).save()

                if (like != null) {
                    return res.status(201).json(like);
                }
            }
            catch (err) {
                return res.status(500).json({ err, message: "Erreur de création du like" });
            }
        }

        else {
            return res.status(200).json({ message: "l'utilisateur a dejà liké ce post", userLike })
        }
    }

    if (likeOrDislike == -1) {
        if (userLike == null) {
            try {
                const dislike = await new userLiked({
                    "userId": userId,
                    "postId": postId,
                    "liked": -1
                }).save()

                if (dislike != null) {
                    return res.status(201).json(dislike);
                }
            }
            catch (err) {
                return res.status(500).json({ err, message: "Erreur de création du like" });
            }
        }

        else if (userLike == 1) {
            
        }

        else {
            return res.status(200).json({ message: "l'utilisateur a dejà disliké ce post", userLike })
        }
    }

}