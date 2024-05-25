const { Router } = require('express');

const router = Router();
const {
    getFee, createFee, clearFee
} = require('../controllers/feeController');
const { auth } = require('../middleware/auth');


router.get('/', getFee);
router.post('/', createFee);
router.delete('/', clearFee);

module.exports = router;