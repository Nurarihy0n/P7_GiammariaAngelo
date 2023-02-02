const express = require('express');
const router = express.Router();
const isModerator = require('../middleware/isAuthor');
// const comReportCtrl = require('../controllers/comReport');
const reportCtrl = require('../controllers/report');

// Recuperation de tous les reports pour le moderateur
// router.get('/:postId/comReport', /*isModerator,*/ comReportCtrl.readAllComReport);
router.get('/:postId/report', /*isModerator,*/ reportCtrl.readAllReport);

module.exports = router;