import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTransfers } from "../redux/transfer/transferSlice";
import { getAccount } from "../redux/account/accountSlice";
import TransferList from "../component/TransferList"
import './TransferList.scss'
import { TbPigMoney } from "react-icons/tb";

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
    }, [user, dispatch, navigate])

    return (
        <div className="wrapper">
            <p className="curr-balance"><TbPigMoney color="#FF81AE" /> Current Balance: {account.balance} VND</p>
            <p className="title">Your Transfers</p>
            {transfers && transfers.length > 0 ?
                <>
                    <TransferList transfers={transfers} user={user} />
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