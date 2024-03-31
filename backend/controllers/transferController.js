const moment = require("moment");
const emailController = require("../controllers/emailController");
const User = require("../model/userModel");
const Account = require("../model/accountModel");
const Transfer = require("../model/transferModel");
const Fee = require("../model/feeModel");
const Otp = require("../model/otpModel");
const { generateTransferCode } = require("../utils/helper");

// make transfer
const makeTransfer = async (req, res) => {
    // user should be authenticated
    // account details of receiver - name, account Number
    // user should have funds in account

    const { otp, fee, selectedUniversity } = req.body;

    const currentTime = moment().unix();

    const checkOtp = await Otp.findOne({ otpCode: otp });

    if (!checkOtp) {
        return res.status(400).json({ message: "OTP not found" });
    }
    // check expriration time otp
    if (checkOtp.expirationTime < currentTime) {
        return res.status(400).json({ message: "OTP expired" });
    }

    checkOtp.isUsed = true;
    await checkOtp.save();

    let accountNumber = selectedUniversity.accountNumber;
    const checkAccountNumber = await Account.findOne({ accountNumber });
    if (!checkAccountNumber) {
        return res.status(400).json({ message: "Account number not found" });
    }

    const sender = await Account.findOne({ user: req.user._id });
    if (!sender) {
        return res.status(400).json({ message: "Sender account not found" });
    }

    const amount = fee.amount;
    if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
    }

    const receiver = await Account.findOne({ accountNumber }).populate("user");

    if (!receiver.user.name.toLowerCase() === selectedUniversity.user.name.toLowerCase()) {
        return res.status(400).json({ message: "Receiver name does not match account" })
    }


    receiver.balance += amount;
    sender.balance -= amount;

    await receiver.save();
    await sender.save();

    const transfer = await Transfer.create({
        senderId: req.user._id,
        receiverId: receiver.user._id,
        otpCode: otp,
        amount,
    })
    transfer.save();
    // update tuitionStatus
    await Fee.findOneAndUpdate({ _id: fee._id }, { tuitionStatus: true });

    res.json({ transfer });
}

const deleteTransfers = async (req, res) => {
    await Transfer.deleteMany();
    res.json({ message: "cleared transfers" });
}

const getTransfers = async (req, res) => {

    try {
        const userId = req.user._id;
        const transfers = await Transfer.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        })
            .populate("senderId")
            .populate("receiverId")
            .sort({ createdAt: -1 })
        if (!transfers) {
            return res.status(200).json({ message: 'No transfers found' });
        }
        return res.status(200).json({ transfers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }

}

const sendOtpCode = async (req, res) => {
    try {
        const otpCode = generateTransferCode();

        const otpData = await Otp.create({
            account: req.body.account._id,
            otpCode: otpCode,
        })

        await emailController.sendSimpleEmail({
            recieverEmail: req.body.user.email,
            amount: req.body.fee.amount,
            otpCode: otpCode
        })

        return res.status(200).json({ otpData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const sendInvoice = async (req, res) => {
    try {
        await emailController.sendInvoiceEmail({
            recieverEmail: req.body.user.email,
            studentName: req.body.fee.student.studentName,
            transferId: req.body.transfer.transfer._id,
        })

        return res.status(200).json({ message: 'Successfully paid tuition fees' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = {
    makeTransfer,
    deleteTransfers,
    getTransfers,
    sendOtpCode,
    sendInvoice
}