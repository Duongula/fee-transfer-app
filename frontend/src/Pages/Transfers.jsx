import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTransfers } from "../redux/transfer/transferSlice";
const { TransferList } = require('../component/TransferList');


function Transfers() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { transfers } = useSelector(state => state.transfer);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    useEffect(() => {
        // get all transfers
        dispatch(getTransfers())
    }, [])

    return (
        <div>
            <h1 className="heading">Your Transfers</h1>
            <TransferList />
        </div>
    )
}

export default Transfers