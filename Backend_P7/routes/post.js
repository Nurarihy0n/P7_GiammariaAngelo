const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const isAuthor = require('../middleware/isAuthor');


router.post('/', /*auth,*/multer, postCtrl.createPost);
router.get('/', /*auth,*/ postCtrl.readAllPost);
router.get('/:postId', /*auth,*/ postCtrl.readOnePost);
router.put('/:postId', /*auth,*/ /*isAuthor.postAuthor,*/ multer, postCtrl.updatePost);
router.delete('/:postId', /*auth,*/ isAuthor.postAuthor, postCtrl.deletePost);

//routes pour les like et dislike
router.post('/:postId/like', auth, likeCtrl.likeDislike);

module.exports = router
