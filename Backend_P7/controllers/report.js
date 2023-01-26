const Report = require('../models/Report');
const { report } = require('../routes/report');

exports.createReport = (req, res, next) => {
    const report = new Report({
        postId : req.params.postId,
        userId : req.body.userId,
        content : req.body.content,
        titlePostReport: req.params.title,
        contentPostReport : req.params.content
          
    }).save()
        .then(() => res.status(201).json({ msg: "This post has been reported !"}))
        .catch(error => res.status(500).json({ error, msg: "This post cannot be reported !"}));
};

exports.deleteReport = (req, res, next) => {
    Report.destroy({ where: { reportId: req.params.reportId }})
    .then(() => res.status(201).json({ msg: 'Report has been deleted !'}))
    .catch(error => res.status(500).json({ error, msg: 'Report cannot be deleted !' }));
};

exports.readAllReport = (req, res, next) => {
    Report.findAll()
    .then((reports) => res.status(200).json(reports))
    .catch(error => res.status(400).json({ error, msg: 'Reports not found !'}))
}