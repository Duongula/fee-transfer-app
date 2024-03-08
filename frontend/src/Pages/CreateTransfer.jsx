import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTransfer, reset } from "../redux/transfer/transferSlice"
import { getAccount } from "../redux/account/accountSlice";
import { getFee } from "../redux/fee/feeSlice";
import { sendOtpCode } from "../redux/transfer/transferSlice";


function CreateTransfer() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { account } = useSelector(state => state.account);
    const { fee } = useSelector(state => state.fee);
    const [studentNumber, setStudentNumber] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        dispatch(getAccount())
    }, [user])

    useEffect(() => {
        if (studentNumber) {
            dispatch(getFee({
                studentId: studentNumber,
                date: Math.floor(Date.now() / 1000)
            }));
        }
    }, [studentNumber, dispatch]);

    const handleChange = (e) => {
        setStudentNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (condition === false) {
            const emailData = {
                account: account,
                user: user,
                fee: fee,
            };
            dispatch(sendOtpCode(emailData));

            navigate("/otp");
        }
    };

    const [condition, setCondition] = useState(true);

    useEffect(() => {
        if (fee) {
            setCondition(false);
        }
    }, [fee]);

    return (
        <div>
            <h1 className="heading">Make Transfer</h1>
            <h1 className="heading">Current Balance: {account.balance}VND</h1>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>MSSV</label>
                        <input className='form-control'
                            value={studentNumber}
                            onChange={handleChange}
                        />
                    </div>
                    {fee && (
                        <div>
                            {/* Hiển thị các thông tin cần thiết từ fee */}
                            <p>Fee: {fee.amount}</p>
                            <p>Status: {fee.tuitionStatus ? "đã đóng" : "chưa đóng"}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`btn ${condition ? "btn-gray" : "btn-red"}`}
                        disabled={condition}
                    >
                        Create Transfer
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateTransfer