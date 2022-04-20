const ComReport = require('../models/ComReport');
const { comReport } = require('../routes/comReport');

//Signalement d'un commentaire

exports.createComReport = (req, res, next) => {
    const comReport = new ComReport({
        postId : req.params.postId,
        comId : req.params.comId,
        userId : req.body.userId,
        content : req.body.content
    }).save()
        .then(() => res.status(201).json({ msg: "This comment has been reported !"}))
        .catch(error => res.status(500).json({error, msg: "This comment cannot be reported !"}))
};

exports.deleteComReport = (req, res, next) => {
    ComReport.destroy({ where: { comReportId: req.params.comReportId }})
    .then(() => res.status(201).json({ msg: "Report on comment has been deleted !"}))
    .catch(error => res.status(500).json({ error, msg: "Report on comment cannot be deleted !"}))
}