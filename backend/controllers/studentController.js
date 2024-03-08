const Student = require('../model/studentModel');


const getStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ mssv: req.mssv });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Internal server error" });
    }
}

const createStudent = async (req, res) => {
    try {
        const { mssv, studentName } = req.body;
        const student = await Student.create({
            mssv,
            studentName,
        });

        res.status(201).json({ student });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const clearStudents = async (req, res) => {
    await Student.deleteMany({});
    res.json({ message: "cleared students" });
}


module.exports = {
    getStudent, createStudent, clearStudents,
}