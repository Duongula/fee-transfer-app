const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    tuitionStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    startedTime: {
        type: String,
        required: true
    },
    endedTime: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
})


module.exports = mongoose.model("Fee", feeSchema);