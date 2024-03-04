import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTransfer } from "../redux/transfer/transferSlice"


function CreateTransfer() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { transfers, isSuccess } = useSelector(state => state.transfer);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            navigate("/transfers");
        }
    }, [isSuccess])

    const [formData, setFormData] = useState({
        name: "",
        accountNumber: "",
        amount: ""
    })

    const { accountNumber, name, amount } = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // dispatch action to create transfer   
        dispatch(createTransfer({ name, accountNumber, amount }))
    }

    return (
        <div>
            <h1 className="heading">Make Transfer</h1>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter name" value={name} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="accountNumber">Account Number</label>
                        <input type="number" name="accountNumber" id="accountNumber" placeholder="Enter account number" value={accountNumber} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" name="amount" id="amount" placeholder="Enter account amount" value={amount} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn">Create Transfer</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTransfer