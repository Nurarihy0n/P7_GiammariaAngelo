const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const comCtrl = require('../controllers/commentaire');

router.post('/:postId/comment', auth, comCtrl.createComment);
router.get('/:postId/comment', auth, comCtrl.readAllComment);
router.get('/:postId/comment/:comId', auth, comCtrl.readOneComment);
router.put('/:postId/comment/:comId', auth, comCtrl.modifyComment);
router.delete('/:postId/comment/:comId', auth, comCtrl.deleteComment);


module.exports = router