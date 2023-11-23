const UserController = require('../controllers/usesController');
const verifyJwt = require('../middlewares/verifyJwt');
const router = require('express').Router();

router.post('/signUp', UserController.signUp);
router.post('/signIn', UserController.signIn);
router.get('/user/:id', verifyJwt, UserController.findOne);

module.exports = router;