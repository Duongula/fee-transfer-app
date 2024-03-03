const { Router } = require('express');
const { getAccounts, deleteAccounts } = require('../controllers/accountController');

const router = Router();

router.get('/', getAccounts);
router.delete('/', deleteAccounts);

module.exports = router;