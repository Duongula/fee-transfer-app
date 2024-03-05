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
            <div className="cta-wrapper">
                <Link to="/create" className="cta">Transfer money</Link>
            </div>
        </div>
    )
}

export default Dashboard