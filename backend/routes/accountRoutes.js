const { Router } = require('express');
const { getAccounts, getAccount, deleteAccounts, getAccountUni } = require('../controllers/accountController');
const { auth } = require('../middleware/auth');
const router = Router();

router.get('/all', getAccounts);
router.get('/', auth, getAccount);
router.delete('/', deleteAccounts);
router.get('/get-account-uni', getAccountUni);

module.exports = router;