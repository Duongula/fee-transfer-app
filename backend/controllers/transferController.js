const User = require("../model/userModel");
const Account = require("../model/accountModel");
const Transfer = require("../model/transferModel");

// make transfer
const makeTransfer = async (req, res) => {
    // user should be authenticated
    // account details of receiver - name, account Number
    // user should have funds in account

    const { name, accountNumber, amount } = req.body;
    const checkAccountNumber = await Account.findOne({ accountNumber });
    if (!checkAccountNumber) {
        return res.status(400).json({ message: "Account number not found" });
    }

    const sender = await Account.findOne({ user: req.user._id });
    if (!sender) {
        return res.status(400).json({ message: "Sender account not found" });
    }
    if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
    }

    const receiver = await Account.findOne({ accountNumber }).populate("user");

    if (!receiver.user.name.toLowerCase() === name.toLowerCase()) {
        return res.status(400).json({ message: "Receiver name does not match account" })
    }

    receiver.balance += amount;
    sender.balance -= amount;

    await receiver.save();
    await sender.save();

    const transfer = await Transfer.create({
        senderId: req.user._id,
        receiverId: receiver.user._id,
        amount,
    })

    transfer.save();

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
            .sort({ createAt: -1 })
        if (!transfers) {
            return res.status(404).json({ message: 'No transfers found' });
        }
        return res.status(200).json({ transfers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }

}

module.exports = {
    makeTransfer,
    deleteTransfers,
    getTransfers,
}