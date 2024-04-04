import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createTransfer, sendOtpCode, getTransfers, sendInvoice } from "../redux/transfer/transferSlice";
import { useNavigate } from "react-router-dom"
import { getAccount } from "../redux/account/accountSlice";
import { clearFee } from "../redux/fee/feeSlice";
import Loader from "../component/loader/Loader";
import { toast } from 'react-toastify';

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
        const transferData = {
            otp: otp,
            fee: fee,
            selectedUniversity: selectedUniversity.value,
        };
        setLoading(true);
        await dispatch(createTransfer(transferData))
            .then((response) => {
                dispatch(sendInvoice({
                    transfer: response.payload,
                    fee: fee,
                    user: user,
                    account: account,
                }));
                dispatch(clearFee());
                handleNavigation();
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                // Khi hoàn thành hoặc gặp lỗi, set loading thành false
                setLoading(false);
            });
    };

    const handleResendOTP = () => {
        const emailData = {
            account: account,
            user: user,
            fee: fee,
        };
        console.log("đã gửi lại otp");
        dispatch(sendOtpCode(emailData))
            .then(() => {
                toast.success("Gửi lại OTP thành công");
            })
            .catch((error) => {
                toast.error("Đã xảy ra lỗi khi gửi lại OTP");
            });
    };

    // handle không được bấm gửi lại khi mã cũ còn hạn
    return (
        <div>
            {loading && <Loader />}
            <h1 className="heading">Nhập OTP</h1>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>OTP:</label>
                        <input className='form-control' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <button type="submit" className="btn">Xác nhận</button>
                    <button type="button" onClick={handleResendOTP} className="btn">Gửi lại OTP</button>
                </form>
            </div>
        </div>
    );
}

export default OtpPage;