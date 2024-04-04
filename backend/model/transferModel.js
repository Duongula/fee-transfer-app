const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderNumber: {
        type: String,
        required: true,
    },
    otpCode: {
        type: String
    },
    amount: {
        type: Number,
        required: true,
    },
    chargeAmount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Transfer", transferSchema);