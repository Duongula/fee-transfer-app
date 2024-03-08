
const jwt = require("jsonwebtoken");

const generateAccountNumber = () => {
    const date = Date.now();
    const strDate = date.toString();
    const firstFour = strDate.slice(0, 4);
    const randomNumber = Math.floor(Math.random() * 10000 + 1);
    const strRandom = randomNumber.toString();
    const strAccount = firstFour + strRandom;
    const accountNumber = parseInt(strAccount);
    return accountNumber;
}

const generatePin = () => {
    const randomNumber = 10000 + Math.floor(Math.random() * 1000 + 1);
    const strRandomNumber = randomNumber.toString().slice(0, 4);
    const pin = parseInt(strRandomNumber);
    return pin;
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const generateTransferCode = () => {
    const length = 6;
    const characters = '0123456789';

    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}

const calculateExpirationTime = () => {
    const expirationMinutes = 1; // Thời gian hết hạn tính bằng phút
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + expirationMinutes * 60 * 1000); // Thêm số phút vào thời gian hiện tại

    return expirationTime;
}

module.exports = {
    generateAccountNumber,
    generatePin,
    generateToken,
    generateTransferCode,
    calculateExpirationTime
}