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
    let userId = req.body.userId;
    let like = req.body.like;
    const { postId } = req.params;
    console.log(userId);
    console.log(like);
    console.log(postId);

    // 1. Si'utilisateur n'a pas encore liké le post, alors je crée un like dans la table userLiked


    // 2. Si l'utilisateur a déjà liké le post, alors, je ne like plus


    // 3. Si l'utilisateur veut disliker un post, alors s'il n'a pas liké, alors je créé un disliker


    // 4. Si l'utilisateur veut disliker un post, et s'il a déjà liké ce post, alors son like est annulé


    // 5. Si l'utilisateur veut disliker un post, et s'il a déjà disliké ce post, alors on ne fait rien


    let userLike = await userLiked.findOne({ where: { userId: userId, postId: postId } });
    // cree l'utilisateur qui like dans la bdd
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
        if (like == 1) {
            return res.status(200).json({ message: "l'utilisateur a dejà liké ce post", userLike })
        }
    }
    //Si l'utilisateur dislike 
    if (like == -1) {
        //Si il a deja un like et qu'il veut disliker alors on change la valeur dans la bdd
        if (like != 1) {
            await userLiked.update({ liked: req.body.liked }, { where: { liked: req.params.liked } })
                .then((like) => res.status(201).json({like, msg: "Succes" }))
                .catch(err => res.status(500).json({ err, msg: "Probleme avec la modification du like" }))
    //Sinon on cree sont dislike dans la bdd
        } if (like == null) {
            const like = await new userLiked({
                "userId": userId,
                "postId": postId,
                "liked": -1
            }).save()

        } else{
            if(like == -1) {
                return res.status(200).json({ message: "l'utilisateur a dejà disliké ce post", userLike })
            }
        }
    }
}



//|||||||||||||||||||||||| SECTION DES COMMENTAIRES ||||||||||||||||||||||||||

//1. Recuperation de l'id du post
//2. Creation du commentaires
//3. Enregistre le commentaire avec l'id du post 

exports.createComment = (req, res, next) => {

    let userId = req.body.userId;
    let content = req.body.content;
    console.log(userId);
    console.log(content);
    console.log(req.body);

    const comment = new Commentaire({
        "userId": req.body.userId,
        "content": req.body.content,
        "postId": req.params.postId,
    }).save()
        .then(() => res.status(201).json({ msg: "Le commentaire a ete cree" }))
        .catch(error => res.status(500).json({ error, message: "Probleme avec la creation du commentaire" }));
};



exports.readAllComment = (req, res, next) => {
    Commentaire.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(404).json({err, msg: "Not found"}))
};

exports.readOneComment = (req, res, next) => {
    const { comId } = req.params;
    Commentaire.findByPk(comId)
    .then(comment => {
        if (!comment) return res.status(404).json({msg: "Not found !"})
        res.status(200).json(comment)})
    .catch(err => res.status(500).json({ err }));
};

exports.modifyComment = (req, res, next) => { 
    const commentObject = req.file ? {
        ...json.parse(req.body.comment)
    } : { ...req.body };
    console.log(commentObject);
    Commentaire.update({ ...commentObject }, { where : { comId: req.params.comId }})
    .then(() => res.status(201).json({ msg: "Comment updated successfuly"}))
    .catch(error => res.status(400).json({ error, msg: "Failed to update the comment"}))
};

exports.deleteComment = (req, res, next) => {
    Commentaire.destroy({ where: { comId: req.params.comId }})
    .then(() => res.status(201).json({msg: "Comment deleted"}))
    .catch(err => res.status(500).json({err, msg: "Failed to delete the comment"}));
};