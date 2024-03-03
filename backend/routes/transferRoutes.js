const { Router } = require('express');
const { makeTransfer } = require('../controllers/transferController');
const { auth } = require('../middleware/auth');

const router = Router();

router.post('/', auth, makeTransfer);


module.exports = router;