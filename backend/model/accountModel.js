const mongoose = require("mongoose");
const { generateAccountNumber, generatePin } = require("../utils/helper");

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    bankAccountType: {
        type: String,
        required: true,
        default: "Personal"
    }
})


module.exports = mongoose.model("Account", accountSchema);