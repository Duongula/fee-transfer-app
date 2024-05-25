import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createTransfer, sendOtpCode, getTransfers, sendInvoice } from "../redux/transfer/transferSlice";
import { useNavigate } from "react-router-dom"
import { getAccount } from "../redux/account/accountSlice";
import { clearFee } from "../redux/fee/feeSlice";
import Loader from "../component/loader/Loader";
import { toast } from 'react-toastify';
import './Otp.scss'

function OtpPage() {
    const { fee } = useSelector(state => state.fee);
    const { user } = useSelector(state => state.user);
    const { account } = useSelector(state => state.account);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedUniversity = location.state?.selectedUniversity;

    const handleNavigation = () => {
        navigate("/transfer", { replace: true }, () => {
            // Callback function được gọi sau khi chuyển trang thành công
            dispatch(getTransfers());
            dispatch(getAccount());
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (otp.trim() === "") {
            toast.error("Please enter the OTP.");
            return;
        }
        const transferData = {
            otp: otp,
            idFee: fee._id,
            selectedUniversityAccount: selectedUniversity.value.accountNumber,
        };
        console.log("check transferData: ", transferData);
        setLoading(true);
        await dispatch(createTransfer(transferData))
            .then((response) => {
                dispatch(sendInvoice({
                    transfer: response.payload,
                    fee: fee,
                    receiverEmail: user.email,
                    accountNumberSender: account.accountNumber,
                }));
                dispatch(clearFee());
                handleNavigation();
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleResendOTP = () => {
        const emailData = {
            account: account._id,
            recieverEmail: user.email,
            fee: fee.amount,
        };
        console.log("đã gửi lại otp");
        dispatch(sendOtpCode(emailData))
            .then(() => {
                toast.success("Resend OTP successfully");
            })
            .catch((error) => {
                toast.error("An error occurred while resending the OTP");
            });
    };

    // handle không được bấm gửi lại khi mã cũ còn hạn
    return (
        <div className="wrapper-otp">
            {loading && <Loader />}
            <p className="email-text mb-3">Enter the code we just send on your email</p>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className='input-group mb-4'>
                        <input className='form-control' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-confirm">Confirm</button>
                    <button type="button" onClick={handleResendOTP} className="btn btn-resend">Resend OTP</button>
                </form>
            </div>
        </div>
    );
}

export default OtpPage;