import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTransfer } from "../redux/transfer/transferSlice";
import { useNavigate } from "react-router-dom"
import { sendOtpCode } from "../redux/transfer/transferSlice";

function OtpPage() {
    const { fee } = useSelector(state => state.fee);
    const { user } = useSelector(state => state.user);
    const { account } = useSelector(state => state.account);
    const { otps } = useSelector(state => state.transfer);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const transferData = {
            otp: otp,
            fee: fee,
        };
        dispatch(createTransfer(transferData)); // Dispatch createTransfer với mã OTP và fee
        navigate("/transfer");
    };

    const handleResendOTP = async () => {
        const emailData = {
            account: account.accountNumber,
            email: user.email,
            amount: fee.amount,
        };
        await dispatch(sendOtpCode(emailData));
    };

    // handle không được bấm gửi lại khi mã cũ còn hạn
    return (
        <div>
            <h1>Nhập OTP</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    OTP:
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </label>
                <button onClick={handleResendOTP}>Gửi lại OTP</button>
                <button type="submit">Xác nhận</button>
            </form>
        </div>
    );
}

export default OtpPage;