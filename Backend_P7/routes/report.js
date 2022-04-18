const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reportCtrl = require('../controllers/report');

router.post('/:postId/report', auth, reportCtrl.createReport);
router.delete('/:postId/report/:reportId', auth, reportCtrl.deleteReport);

module.exports = router;