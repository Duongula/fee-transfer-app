import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTransfers } from "../redux/transfer/transferSlice";
import TransferList from "../component/TransferList"
import { getAccount } from "../redux/account/accountSlice";

function Transfers() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { transfers } = useSelector(state => state.transfer);
    const { user } = useSelector(state => state.user);
    const { account } = useSelector(state => state.account);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        dispatch(getTransfers())
        dispatch(getAccount())

    }, [user])

    return (
        <div>
            <h1>Current Balance: {account.balance}VND</h1>
            <h1 className="heading">Your Transfers</h1>
            {transfers && transfers.transfers && transfers.transfers.length > 0 ?
                <>
                    <TransferList transfers={transfers.transfers} user={user} />
                </>
                :
                <>
                    <h2>No Transfers</h2>
                </>
            }

        </div>
    )
}

export default Transfers