const Account = require("../model/accountModel");
const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().populate("user");
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Internal server error" });
    }
}

const deleteAccounts = async (req, res) => {
    await Account.deleteMany();
    res.json({ message: "cleared accounts" });
}

const getAccount = async (req, res) => {
    try {
        const account = await Account.findOne({ user: req.user._id });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json(account);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "Internal server error" });
    }
}


module.exports = {
    getAccounts,
    deleteAccounts,
    getAccount
}