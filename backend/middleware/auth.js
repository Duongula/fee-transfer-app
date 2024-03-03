const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const auth = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(400).json({ message: "Not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Not authorized no token" });
    }
}

module.exports = {
    auth
}