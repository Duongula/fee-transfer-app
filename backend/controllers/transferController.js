const User = require("../model/userModel");
const Account = require("../model/accountModel");
const makeTransfer = async (req, res) => {
    const { name, accountNumber } = req.body;

    const checkAccountNumber = await Account.findOne({ accountNumber });
    if (!checkAccountNumber) {
        return res.status(400).json({ message: "Account number not found" });
    }
    const checkName = await User.findOne({ name });

    const senderId = req.user._id;

    const sender = await Account.findOne({ user: senderId });

    if (!sender) {
        return res.status(400).json({ message: "Sender account not found" });
    }

    if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
    }

    const receiver = await Account.findOne({ accountNumber });

    receiver.balance += amount;
    sender.balance -= amount;
    await receiver.save();
    await sender.save();

    res.json({ success: true, senderBalance: sender.balance });
}

const deleteTransfers = async (req, res) => {
    await Transfer.deleteMany();
    res.json({ message: "cleared transfers" });
}


module.exports = {
    makeTransfer,
    deleteTransfers
}