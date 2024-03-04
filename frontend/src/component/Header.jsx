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
        navigate("/login");
    }

    return (
        <header className="main-header">
            <Link to="/" className="logo">
                <h1>MoneyTransfer</h1>
            </Link>
            <nav>
                {user ?
                    (<>
                        <button onClick={handleLogout}>Logout</button>
                    </>)
                    :
                    (<>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>)}
            </nav>
        </header>
    )
}

export default Header