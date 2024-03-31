require('dotenv').config();
const nodemailer = require('nodemailer');
const { PDFDocument, StandardFonts } = require("pdf-lib");

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

let sendInvoiceEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const pdfBytes = await createCustomizedPDF();
    const pdfBuffer = Buffer.from(pdfBytes);

    let info = await transporter.sendMail({
        from: '"ThuyDuong 👻" <httd343@gmail.com>', // sender address
        to: dataSend.recieverEmail, // list of receivers
        subject: "Thông báo về việc phát hành Hóa đơn điện tử", // Subject line
        html: getBodyHTMLEInvoice(dataSend),
        attachments: [
            {
                filename: "customized.pdf",
                content: pdfBuffer,
                cid: "pdfFile",
            },
        ],
    });
}

let getBodyHTMLEInvoice = (dataSend) => {
    let result = `
        <p>Kính gửi Quý khách hàng,</p>
        
        <p>Đơn vị TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG vừa phát hành hóa đơn điện tử của Quý khách hàng ${dataSend.studentName}.</p>
        
        <p>Hóa đơn của khách hàng có:</p>
        <p>- Số hóa đơn: ${dataSend.transferId}</p>
        <p>- Tên khách hàng: ${dataSend.studentName}</p>
        
        <p>Để tải hóa đơn PDF: <a href="cid:pdfFile">Click vào đây để tải PDF về máy</a></p>
        
        <p>Trân trọng cảm ơn Quý khách và chúc Quý khách nhiều thành công khi sử dụng dịch vụ!</p>
        `
    return result;
}

const createCustomizedPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const textSize = 30;
    const text = "Hello, World!";
    page.drawText(text, { x: 50, y: 50, size: textSize, font });

    return await pdfDoc.save();
};


module.exports = {
    sendSimpleEmail, getBodyHTMLEmail, sendInvoiceEmail, getBodyHTMLEInvoice, createCustomizedPDF
}