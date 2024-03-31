import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getUniversities } from "../redux/account/accountSlice";
import { getFee } from "../redux/fee/feeSlice";
import { sendOtpCode } from "../redux/transfer/transferSlice";
import { toast } from 'react-toastify';
import Loader from "../component/loader/Loader";
import Select from 'react-select';

function CreateTransfer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { account } = useSelector(state => state.account);
    const { fee } = useSelector(state => state.fee);
    const [studentNumber, setStudentNumber] = useState("");
    const [confirmation, setConfirmation] = useState(false); // Thêm state cho xác nhận nội dung
    const [feeInfo, setFeeInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);

    useEffect(() => {
        if (fee) {
            setFeeInfo(fee);
        } else {
            setFeeInfo(null);
        }
    }, [fee]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        dispatch(getAccount());
    }, [user]);

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
    };

    const handleConfirmation = (e) => {
        e.preventDefault();
        setConfirmation(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (condition === false) {
            // Check if the entered student number belongs to the selected university

            const emailData = {
                account: account,
                user: user,
                fee: fee,
                university: selectedUniversity,
            };
            if (account.balance < fee.amount) {
                toast.error("Your balance is not enough to make this transfer");
                return;
            } else {
                setLoading(true);
                dispatch(sendOtpCode(emailData))
                    .then((response) => {
                        navigate("/otp", { replace: true, state: { selectedUniversity } });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
                    .finally(() => {
                        // Khi hoàn thành hoặc gặp lỗi, set loading thành false
                        setLoading(false);
                    });
            }
        }
    };

    const [condition, setCondition] = useState(true);

    useEffect(() => {
        setCondition(true);
        if (fee) {
            const studentUniversity = fee.university === selectedUniversity.value._id;
            if (fee && fee.tuitionStatus === false && studentUniversity) {
                setCondition(false);
            }
        }
    }, [fee]);

    useEffect(() => {
        dispatch(getUniversities())
            .then((response) => {
                const result = response.payload.map((item) => {
                    return {
                        value: item,
                        label: item.user.name,
                    };
                });
                setUniversities(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChangeSelect = (selectedOption) => {
        setSelectedUniversity(selectedOption);
    };

    const isUniversitySelected = selectedUniversity !== null;

    return (
        <div>
            {loading && <Loader />}
            <h1 className="heading">Make Transfer</h1>
            <h1 className="heading">Current Balance: {account.balance}VND</h1>

            <div className="form-wrapper">
                {!confirmation ? (
                    <form onSubmit={handleConfirmation}>
                        <div className='form-group'>
                            <label>Select university</label>
                            <Select
                                value={selectedUniversity}
                                onChange={handleChangeSelect}
                                options={universities}
                            />
                        </div>
                        <div className='input-group'>
                            <label>MSSV</label>
                            <input
                                className='form-control'
                                value={studentNumber}
                                onChange={handleChange}
                                disabled={!isUniversitySelected}
                            />
                        </div>
                        {feeInfo && feeInfo !== null && fee.university === selectedUniversity.value._id && (
                            <div>
                                <p>Student name: {feeInfo.student.studentName}</p>
                                <p>Fee: {feeInfo.amount}VND</p>
                                <p>Status: {feeInfo.tuitionStatus ? "đã đóng" : "chưa đóng"}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`btn ${condition ? "btn-gray" : "btn-red"}`}
                            disabled={condition || !isUniversitySelected}
                        >
                            Confirm
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p>Confirmation Content:</p>
                        {/* <p>Nhà cung cấp: { }</p> */}
                        <p>Mã khách hàng: {studentNumber}</p>
                        <p>Số tiền: {feeInfo.amount}</p>
                        <p>Số tiền phí: {Math.floor(feeInfo.amount * 0.01)}</p>
                        <p>Nội dung: {`${studentNumber}_${feeInfo.student.studentName}_Lop:${feeInfo.student.studentClass}_HeDT:${feeInfo.student.typeTraining}_Namhoc:${feeInfo.year}_HK:${feeInfo.semester}`.replace(/ /g, "")}</p>
                        <button
                            type="submit"
                            className="btn"
                        >
                            Create Transfer
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CreateTransfer;