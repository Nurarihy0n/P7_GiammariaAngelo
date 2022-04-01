const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.readAllPost);
router.get('/:postId', auth, postCtrl.readOnePost);
router.put('/:postId', auth, multer, postCtrl.updatePost);
router.delete('/:postId', auth, postCtrl.deletePost);
router.post('/:postId/like', auth, postCtrl.likeDislike);
router.post('/:postId/comment', auth, postCtrl.createComment);
router.get('/:postId/comment/', auth, postCtrl.readAllComment);
router.get('/:postId/comment/:comId', auth, postCtrl.readOneComment);
router.put('/:postId/comment/:comId', auth, postCtrl.modifyComment);
router.delete('/:postId/comment/:comId', auth, postCtrl.deleteComment);
// /:postId/comment/:comId

module.exports = router
