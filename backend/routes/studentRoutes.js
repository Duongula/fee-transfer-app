const { Router } = require('express');

const router = Router();
const {
    getStudent, createStudent, clearStudents,
} = require('../controllers/studentController');


router.get('/', getStudent);
router.post('/', createStudent);
router.delete('/', clearStudents);

module.exports = router;