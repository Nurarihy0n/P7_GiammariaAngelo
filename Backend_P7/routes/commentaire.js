const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const comCtrl = require('../controllers/commentaire');
const isAuthor = require('../middleware/isAuthor');

router.post('/:postId/comment', comCtrl.createComment);
router.get('/:postId/comment', auth, comCtrl.readAllComment);
router.get('/:postId/comment/:comId', auth, comCtrl.readOneComment);
router.put('/:postId/comment/:comId', auth, isAuthor.commentAuthor, comCtrl.modifyComment);
router.delete('/:postId/comment/:comId', auth, isAuthor.commentAuthor, comCtrl.deleteComment);


module.exports = router