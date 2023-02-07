
const userLiked = require('../models/userLiked');

exports.likeDislike = async (req, res, next) => {

    let userId = req.body.userId;
    let likeOrDislike = req.body.liked;
    let { postId } = req.params;
    postId = parseInt(postId)

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
        //Si l'utilisateur annule sont dislike
        else if (userLike.liked == -1) {
            userLike.increment('liked', {by: 1});
            return res.status(200).json({ userLike, message: "Like updated !"})
        }
        //Si l'utilisateur like et qu'il est deja enregistree dans la bdd
        else if (userLike.liked == 0) {
            userLike.increment('liked', {by: 1});
            return res.status(200).json({ userLike, message: "Like updated !"})
        }

        else {
            return res.status(200).json({ message: "l'utilisateur a dejà liké ce post", userLike })
        }
    }
    //Cree un utilisateur qui dislike dans la bdd
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
        //Si l'utilisateur annule sont like
        else if (userLike.liked == 1) {
            userLike.decrement('liked', {by: 1});
            return res.status(200).json({userLike, message: "Dislike updated"})
        }
        //Si l'utilisateur dislike un post et qu'il est deja dans la bdd
        else if (userLike.liked == 0) {
            userLike.decrement('liked', {by: 1});
            return res.status(200).json({userLike, message: "Dislike updated"})
        }

        else {
            return res.status(200).json({ message: "l'utilisateur a dejà disliké ce post", userLike })
        }
    }

}

exports.getLikeDislike = async (req, res, next) => {
    const { postId } = req.params;
    userLiked.findAll({ where: { postId: postId }})
    .then(postLike => {
        if(!postLike) return res.status(404).json({msg: "Like/Dislike not found !"})
        res.status(200).json(postLike)
    })
    .catch(err => res.status(500).json({err, msg: "Erreur lors de la recuperation de like en bdd"}))
}