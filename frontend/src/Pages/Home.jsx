import React, { useState } from 'react';
import logo from './E-Wallet-pana.svg';
import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TbFlagHeart } from "react-icons/tb";
import { RiSafe2Fill } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";


function Home() {
    const [amount, setAmount] = useState(0);

    const handleSendMoney = () => {
        // Gửi tiền
    };

    return (
        <div className='heading'>
            <div className='left-content'>
                <div className="title-content">
                    Send money more faster
                </div>

                <div className='send-money' style={{ backgroundColor: '#ffff' }}>
                    <div className="amount-input">
                        <p>Amount</p>
                        <p>2,000,000</p>
                    </div>
                    <div className='flag-content'>
                        <div className='flag-left'>
                            <div className="vl"></div>
                            <TbFlagHeart size={50} color="#FF81AE" />
                            <select className="form-select select-country" id="autoSizingSelect">
                                <option selected>IDR</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <button className='btn btn-warning' onClick={handleSendMoney}>Send now</button>
                    </div>
                </div>

                <div className="safety-guarantee">
                    <div className="safety-features">
                        <RiSafe2Fill size={70} color='#8083D3' />
                        <p style={{ fontWeight: 'bold' }}>Safety guarantee</p>
                        <p>We make sure your money will be safe 100% guarantee</p>
                        <a href="#">Read more <BsArrowRightShort /></a>
                    </div>
                    <div className='fast-features'>
                        <FaMoneyCheckAlt size={70} color='#8083D3' />
                        <p style={{ fontWeight: 'bold' }}>Send money in minutes</p>
                        <p>Your money will be sent faster than your blue wallet</p>
                        <a href="#">Send money now <BsArrowRightShort /></a>
                    </div>
                </div>
            </div>
            <div className='right-content'>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        </div>
    )
}

export default Home