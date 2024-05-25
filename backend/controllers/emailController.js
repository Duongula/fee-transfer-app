require('dotenv').config();
const moment = require("moment");
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

    const pdfBytes = await createCustomizedPDF(dataSend);
    const pdfBuffer = Buffer.from(pdfBytes);

    let info = await transporter.sendMail({
        from: '"ThuyDuong 👻" <httd343@gmail.com>', // sender address
        to: dataSend.receiverEmail, // receiver
        subject: "Biên lai thanh toán",
        html: getBodyHTMLEInvoice(dataSend),
        attachments: [
            {
                filename: "receipt.pdf",
                content: pdfBuffer,
                cid: "pdfFile",
            },
        ],
    });
}

let getBodyHTMLEInvoice = (dataSend) => {
    let result = `
        <p>Kính gửi Quý khách hàng,</p>

        <p>Thông tin giao dịch của khách hàng có:</p>
        <p>Ngày giao dịch: ${moment(dataSend.transfer.transfer.createdAt).format('DD-MM-YYYY')}.</p>
        <p>Số giao dịch: ${dataSend.transfer.transfer.orderNumber}</p>
        <p>Tài khoản nguồn: ${dataSend.accountNumberSender}</p>
        <p>Tài khoản hưởng: ${dataSend.receiver.accountNumber}</p>
        <p>Tên người hưởng: ${dataSend.receiver.user.name}</p>
        <p>Số tiền: ${dataSend.transfer.transfer.amount}</p>
        <p>Số tiền phí: ${dataSend.transfer.transfer.chargeAmount}</p>
        
        <p>Để tải biên lai PDF: <a href="cid:pdfFile">Click vào đây để tải PDF về máy</a></p>
        
        <p>Trân trọng cảm ơn Quý khách và chúc Quý khách nhiều thành công khi sử dụng dịch vụ!</p>
        `
    return result;
}

const createCustomizedPDF = async (dataSend) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const textSize = 20;
    const { transfer, accountNumberSender, receiver, fee } = dataSend;
    const yStart = page.getHeight() - 50;
    const lineHeight = 20;

    page.drawText(`Ngay giao dich: ${moment(transfer.transfer.createdAt).format('DD-MM-YYYY')}`, { x: 50, y: yStart, size: textSize, font });
    page.drawText(`So giao dich: ${transfer.transfer.orderNumber}`, { x: 50, y: yStart - lineHeight, size: textSize, font });
    page.drawText(`Tai khoan nguon: ${accountNumberSender}`, { x: 50, y: yStart - 2 * lineHeight, size: textSize, font });
    page.drawText(`Tai khoan huong: ${receiver.accountNumber}`, { x: 50, y: yStart - 3 * lineHeight, size: textSize, font });
    page.drawText(`Ho ten sinh vien: ${fee.student.studentName}`, { x: 50, y: yStart - 5 * lineHeight, size: textSize, font });
    page.drawText(`Ma so sinh vien: ${fee.student.mssv}`, { x: 50, y: yStart - 6 * lineHeight, size: textSize, font });
    page.drawText(`Lop: ${fee.student.studentClass}`, { x: 50, y: yStart - 7 * lineHeight, size: textSize, font });
    page.drawText(`So tien: ${transfer.transfer.amount}`, { x: 50, y: yStart - 8 * lineHeight, size: textSize, font });
    page.drawText(`So tien phi: ${transfer.transfer.chargeAmount}`, { x: 50, y: yStart - 9 * lineHeight, size: textSize, font });


    return await pdfDoc.save();
};


module.exports = {
    sendSimpleEmail, getBodyHTMLEmail, sendInvoiceEmail, getBodyHTMLEInvoice, createCustomizedPDF
}