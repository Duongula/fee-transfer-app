const { Router } = require('express');
const { getAccounts, getAccount, deleteAccounts } = require('../controllers/accountController');
const { auth } = require('../middleware/auth');
const router = Router();

router.get('/all', getAccounts);
router.get('/', auth, getAccount);
router.delete('/', deleteAccounts);

module.exports = router;