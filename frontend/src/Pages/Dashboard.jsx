import { Link } from "react-router-dom"

function Dashboard() {
    return (
        <div>
            <h1 className='heading'>Dashboard</h1>
            <Link to="/transfer/create">Start Transfer</Link>
        </div>
    )
}

export default Dashboard