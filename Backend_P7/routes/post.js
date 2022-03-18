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
// router.post('/:postId/like', auth, postCtrl.likeDislike);
// routes pour les commentaires

router.post('/:postId', auth, postCtrl.createComment);

// /:postId/comment/:comId

module.exports = router;