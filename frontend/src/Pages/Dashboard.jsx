import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Dashboard() {

    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <h1 className='heading'>Welcome {user?.name} </h1>
            <h1 className=''>This is your information</h1>
            <p className=''>Your name: {user?.name} </p>
            <p className=''>Your phone number: {user?.phoneNumber} </p>
            <p className=''>Your email: {user?.email} </p>
            <div className="cta-wrapper">
                <Link to="/create" className="cta">Transfer money</Link>
            </div>
        </div>
    )
}

export default Dashboard