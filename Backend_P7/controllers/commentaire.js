const Commentaire = require('../models/Commentaire');
const post = require('../models/modelsPost');
const User = require('../models/User');
const { STATUS_CODES } = require('http');
const { comment } = require('../routes/commentaire');
const { response } = require('express');

exports.createComment = (req, res, next) => {

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

// exports.readAllComment = (req, res, next) => {
//     const { postId } = req.params;
//     Commentaire.findByPk(postId)
//     .then(postComment => {
//         if(!postComment) return res.status(404).json({msg: "Not found !"})
//         res.status(200).json(postComment)})
//     .catch(err => res.status(500).json({ err }));
// }

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