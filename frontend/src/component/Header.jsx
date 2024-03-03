import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="main-header">
            <Link to="/" className="logo">
                <h1>MoneyTransfer</h1>
            </Link>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}

export default Header