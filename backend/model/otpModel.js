const mongoose = require("mongoose");
const { calculateExpirationTime } = require("../utils/helper");

const otpSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    otpCode: {
        type: Number,
        required: true
    },
    exprirationTime: {
        type: String,
        required: true
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
    if (!this.isModified('exprirationTime')) {
        this.exprirationTime = calculateExpirationTime();
    }
    next();
})

module.exports = mongoose.model("Otp", otpSchema);