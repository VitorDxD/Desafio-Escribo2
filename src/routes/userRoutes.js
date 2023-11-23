const UserController = require('../controllers/usesController');
const router = require('express').Router();

router.post('/signUp', UserController.signUp);
router.get('/signIn', UserController.signIn);

module.exports = router;