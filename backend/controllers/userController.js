const User = require('../model/userModel');
const Account = require('../model/accountModel');
const { generateAccountNumber, generatePin, generateToken } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password
        });

        // create the account
        const account = await Account.create({
            user: user._id,
            accountNumber: generateAccountNumber(),
            pin: generatePin(),
            balance: 0
        });

        // set cookies adter registering the user
        const token = generateToken(user._id);
        res.cookie("jwt", token);
        res.status(201).json({ user, account });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const clearUsers = async (req, res) => {
    await User.deleteMany({});
    res.json({ message: "cleared users" });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // set cookies
        // send back user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("jwt", token);
        res.status(200).json({ _id: user._id, email: user.email, name: user.name, createAt: user.createdAt, updatedAt: user.updatedAt });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logoutUser = async (req, res) => {
    res.cookie("jwt", " ", { maxAge: 1 });
    return res.json({ message: "logged out" });
}

const getProfile = async (req, res) => {
    res.json(req.user);
}

module.exports = {
    getUsers, createUser,
    clearUsers, loginUser,
    logoutUser, getProfile
}