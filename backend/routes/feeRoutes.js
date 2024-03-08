const { Router } = require('express');

const router = Router();
const {
    getFee, createFee, clearFee
} = require('../controllers/feeController');


router.get('/', getFee);
router.post('/', createFee);
router.delete('/', clearFee);

module.exports = router;