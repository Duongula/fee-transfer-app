const { Router } = require('express');
const {
    makeTransfer,
    deleteTransfers,
    getTransfers
} = require('../controllers/transferController');
const { auth } = require('../middleware/auth');

const router = Router();

router.get('/', auth, getTransfers);
router.post('/', auth, makeTransfer);
router.delete('/', deleteTransfers);


module.exports = router;