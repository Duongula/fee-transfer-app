const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    mssv: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    typeTraining: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model("Student", studentSchema);