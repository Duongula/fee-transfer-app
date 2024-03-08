const mongoose = require("mongoose");
const { calculateExpirationTime } = require("../utils/helper");

const otpSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    otpCode: {
        type: String,
        required: true
    },
    expirationTime: {
        type: String,
    },
    isUsed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
})

otpSchema.pre('save', function (next) {
    if (!this.isModified('expirationTime')) {
        this.expirationTime = calculateExpirationTime();
    }
    next();
})

module.exports = mongoose.model("Otp", otpSchema);