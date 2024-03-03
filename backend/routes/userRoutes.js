const { Router } = require('express');

const router = Router();
const {
    getUsers,
    createUser,
    clearUsers,
    loginUser,
    logoutUser,
    getProfile
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');


router.get('/', getUsers);
router.post('/', createUser);
router.delete('/', clearUsers);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', auth, getProfile);

module.exports = router;