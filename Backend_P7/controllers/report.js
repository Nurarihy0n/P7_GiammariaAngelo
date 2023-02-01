const Report = require('../models/Report');
const { report } = require('../routes/report');
const Post = require('../models/modelsPost');
const User = require('../models/User');

exports.createReport = (req, res, next) => {
    const report = new Report({
        postId : req.params.postId,
        userId : req.body.userId,
        content : req.body.content
          
    }).save()
        .then(() => res.status(201).json({ msg: "This post has been reported !"}))
        .catch(error => res.status(500).json({ error, msg: "This post cannot be reported !"}));
};

exports.deleteReport = (req, res, next) => {
    Report.destroy({ where: { reportId: req.params.reportId }})
    .then(() => res.status(201).json({ msg: 'Report has been deleted !'}))
    .catch(error => res.status(500).json({ error, msg: 'Report cannot be deleted !' }));
};

// const readPost = (req, res, next) => {
//     const postId = req.params;
//     Post.findByPk(postId)
//         .then(post => {
//             if(!post) return res.status(404).json({ msg: "Post not found for reading report !"})
//             res.status(200).json(post)
//         })
//         .catch(error => res.status(400).json({ error, message: 'Post cannot be found !' }));
//}

exports.readAllReport = (req, res, next) => {
    Report.findAll({include: User})
    .then((reports) => res.status(200).json(reports))
    .catch(error => res.status(400).json({ error, msg: 'Reports not found !'}))
}