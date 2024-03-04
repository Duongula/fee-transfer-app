const User = require("../model/userModel");
const Account = require("../model/accountModel");
const Transfer = require("../model/transferModel");

// make transfer
const makeTransfer = async (req, res) => {
    // user should be authenticated
    // account details of receiver - name, account Number
    // user should have funds in account

    const { name, accountNumber } = req.body;

    const checkAccountNumber = await Account.findOne({ accountNumber });

    // verify account number
    if (!checkAccountNumber) {
        return res.status(400).json({ message: "Account number not found" });
    }
    const checkName = await User.findOne({ name });

    // check if sender has enough funds in account
    const senderId = req.user._id;

    // find the account of user and check the account user balance
    const sender = await Account.findOne({ user: senderId });

    if (!sender) {
        return res.status(400).json({ message: "Sender account not found" });
    }

    // check the balance of the sender
    if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
    }

    // get receiver
    const receiver = await Account.findOne({ accountNumber });

    // add amount to receiver balance and deduct amount from sender balance
    receiver.balance += amount;
    sender.balance -= amount;

    await receiver.save();
    await sender.save();

    const transfer = await Transfer.create({
        senderId: req.user._id,
        receiver: receiver._id,
        amount,
    })

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
            $or: [{ senderId: userId }, { receiver: userId }]
        })
        if (!transfers) {
            return res.status(404).json({ message: 'No transfers found' });
        }
        res.status(200).json({ transfers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }

    res.json({ message: "get transfers" });
}

module.exports = {
    makeTransfer,
    deleteTransfers,
    getTransfers,
}