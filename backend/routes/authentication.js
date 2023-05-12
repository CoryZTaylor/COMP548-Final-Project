const { loginUser, registerUser, userInfo, verifyToken, uploadImage } = require('../controllers/authentication');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/multerConfig');

const router = require('express').Router();

router.post('/login', loginUser)
    .post('/register', upload.single('image'), registerUser)
    .get('/user', authenticate, userInfo)
    .post('/verify-token', verifyToken)
    .post('/upload-image', authenticate, upload.single('image'), uploadImage);

module.exports = router