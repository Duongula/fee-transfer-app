const Fee = require('../model/feeModel');
const Student = require('../model/studentModel');
const Account = require('../model/accountModel');
const moment = require('moment');

const getFee = async (req, res) => {
    try {
        const { studentId, date } = req.query;
        const student = await Student.findOne({ mssv: studentId });
        if (!student) {
            return res.status(200).json(null);
        }
        const fee = await Fee.find({ student: student._id }).populate("student");
        const foundFee = fee.find((feeRecord) => {
            const startedTime = moment(feeRecord.startedTime, "D-M-YYYY").unix();
            const endedTime = moment(feeRecord.endedTime, "D-M-YYYY").unix();
            return date >= startedTime && date <= endedTime;
        });
        if (foundFee) {
            return res.status(200).json(foundFee);
        }
        return res.status(404).json({ message: "Fee not found" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Internal server error" });
    }
}

const createFee = async (req, res) => {
    try {
        const { studentId, uniAccount, semester, year, amount, tuitionStatus, startedTime, endedTime } = req.body;
        const student = await Student.findOne({ mssv: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const university = await Account.findOne({ accountNumber: uniAccount });
        if (!university) {
            return res.status(404).json({ message: "Uni not found" });
        }
        const fee = await Fee.create({
            student: student._id,
            university: university._id,
            semester,
            year,
            amount,
            tuitionStatus,
            startedTime,
            endedTime
        });

        res.status(201).json({ fee });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const clearFee = async (req, res) => {
    await Fee.deleteMany({});
    res.json({ message: "cleared fee" });
}


module.exports = {
    getFee, createFee, clearFee
}