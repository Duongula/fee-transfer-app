import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import './Dashboard.scss';
import { FaCircleUser } from "react-icons/fa6";
import { BiPhoneCall } from "react-icons/bi";
import { FiMail } from "react-icons/fi";


function Dashboard() {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="wrapper-dashboard">
            <h3 className='title-welcome' style={{ fontWeight: 'bold' }}>Welcome, <span style={{ color: '#AB7EE7' }}>{user?.name}</span> </h3>
            <h4 className='title-info'>This is your information</h4>
            <div className="row mt-4">
                <div className="col-sm-3">
                    <p className="mb-0"><FaCircleUser size={20} /> Full Name</p>
                </div>
                <div className="col-sm-9">
                    <p className=''>{user?.name} </p>
                </div>
            </div>
            <hr />
            <div className="row mt-4">
                <div className="col-sm-3">
                    <p className="mb-0"><BiPhoneCall size={20} /> Phone Number</p>
                </div>
                <div className="col-sm-9">
                    <p className=''>{user?.phoneNumber} </p>
                </div>
            </div>
            <hr />
            <div className="row mt-4">
                <div className="col-sm-3">
                    <p className="mb-0"><FiMail size={20} /> Email</p>
                </div>
                <div className="col-sm-9">
                    <p className=''>{user?.email} </p>
                </div>
            </div>
            <div className="cta-wrapper">
                <Link to="/create" className="cta" style={{ textDecoration: 'none' }}>Transfer money</Link>
            </div>
        </div>
    )
}

export default Dashboard