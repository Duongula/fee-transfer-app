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
    }
})

// generate account number here
// accountSchema.pre('save', function (next) {
//     if (!this.isModified('accountNumber')) {
//         this.accountNumber = generateAccountNumber();
//     }

//     if (!this.isModified('pin')) {
//         this.pin = generatePin();
//     }

//     next();
// })

// generate the pin

module.exports = mongoose.model("Account", accountSchema);