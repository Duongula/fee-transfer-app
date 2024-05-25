import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, getUniversities } from "../redux/account/accountSlice";
import { getFee } from "../redux/fee/feeSlice";
import { sendOtpCode } from "../redux/transfer/transferSlice";
import { toast } from 'react-toastify';
import Loader from "../component/loader/Loader";
import Select from 'react-select';
import './Transfer.scss'
import { TbPigMoney } from "react-icons/tb";

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
            const emailData = {
                account: account._id,
                recieverEmail: user.email,
                fee: fee.amount,
                university: selectedUniversity,
            };
            if (account.balance < fee.amount + feeInfo.amount * 0.01) {
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
        if (fee && selectedUniversity) {
            const studentUniversity = selectedUniversity && fee.university === selectedUniversity.value._id;

            if (fee && fee.tuitionStatus === false && studentUniversity) {
                setCondition(false);
            }
        }
    }, [fee, selectedUniversity]);

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

    let isUniversitySelected = selectedUniversity !== null;

    return (
        <div className="wrapper-create-transfer">
            {loading && <Loader />}
            <h3 className="title-transfer">Make Transfer</h3>

            <div className="form-wrapper mt-4">
                <h4 className="title-balance"><TbPigMoney color="#FF81AE" /> Current Balance: {account.balance} VND</h4>
                {!confirmation ? (
                    <form onSubmit={handleConfirmation}>
                        <div className='form-group mt-4'>
                            <label>Select University</label>
                            <Select
                                value={selectedUniversity}
                                onChange={handleChangeSelect}
                                options={universities}
                            />
                        </div>
                        <div className='input-group mt-4'>
                            <label>Student ID</label>
                            <input
                                className='form-control'
                                value={studentNumber}
                                onChange={handleChange}
                                disabled={!isUniversitySelected}
                            />
                        </div>
                        {feeInfo && feeInfo !== null && feeInfo.university === selectedUniversity.value._id && (
                            <div>
                                <p>Student name: {feeInfo.student.studentName}</p>
                                <p>Fee: {feeInfo.amount}VND</p>
                                <p>Status: {feeInfo.tuitionStatus ? "đã đóng" : "chưa đóng"}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`btn-confirm btn ${condition ? "btn-gray" : "btn-red"}`}
                            disabled={condition || !isUniversitySelected}
                        >
                            Confirm
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p>Confirmation Information:</p>
                        <div className="row mt-4">
                            <div className="col-sm-4">
                                <p className="mb-0">Student ID</p>
                            </div>
                            <div className="col-sm-8">
                                <p>{studentNumber}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <p className="mb-0">Amount</p>
                            </div>
                            <div className="col-sm-8">
                                <p>{feeInfo.amount} VND</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <p className="mb-0">Charge amount</p>
                            </div>
                            <div className="col-sm-8">
                                <p>{Math.floor(feeInfo.amount * 0.01)} VND</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <p className="mb-0">Transfer Content</p>
                            </div>
                            <div className="col-sm-8">
                                <p style={{ wordWrap: "break-word" }}>{`${studentNumber}_${feeInfo.student.studentName}_Lop:${feeInfo.student.studentClass}_HeDT:${feeInfo.student.typeTraining}_Namhoc:${feeInfo.year}_HK:${feeInfo.semester}`.replace(/ /g, "")}</p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-trans"
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