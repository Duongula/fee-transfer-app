import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user);

    const handleLogout = async () => {
        dispatch(logoutUser());
        navigate("/");
    }

    return (
        <header className="main-header">
            <Link to="/" className="logo">
                <h1 style={{ color: '#273751', fontWeight: 'bold' }}>MoneyTransfer</h1>
            </Link>
            <nav>
                {user ?
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/transfer">Transfers</Link>
                        <Link to="/create">Create</Link>
                        <button onClick={handleLogout} style={{ color: 'white', backgroundColor: '#273751', padding: '5px 20px', borderRadius: '10px' }}>Logout</button>
                    </>
                    :
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login" >Login</Link>
                        <Link to="/register" style={{ color: 'white', backgroundColor: '#273751', padding: '5px 20px', borderRadius: '10px' }}>Register</Link>
                    </>
                }
            </nav>
        </header>
    )
}

export default Header