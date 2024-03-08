require('dotenv').config();
const nodemailer = require('nodemailer');

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '"ThuyDuong 👻" <httd343@gmail.com>', // sender address
        to: dataSend.recieverEmail, // list of receivers
        subject: "Mã OTP giao dịch chuyển khoản.", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = `
        <div>
        <p>Mã OTP xác thực giao dịch là ${dataSend.otpCode}</p>
        <p>Hiệu lực của mã là 1 phút.</p>
        <p>Chi tiết giao dịch: Chuyển khoản nhanh qua sô TK, số tiền ${dataSend.amount}</p>
        <p>Vui lòng nhập mã xác thực để hoàn tất quá trình giao dịch.</p>
        </div>
        <div>Xin chân thành cảm ơn.</div>
        `
    return result;
}


module.exports = {
    sendSimpleEmail, getBodyHTMLEmail
}