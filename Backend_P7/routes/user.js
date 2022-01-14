const express = require('express');
const router = express.Router();
const passwordValidator =  require('../middleware/passwordValidator');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login)

module.exports = router;