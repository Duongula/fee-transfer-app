import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/user/userSlice";
import { useSelector } from "react-redux";


function Login() {

    const { user, isSuccess } = useSelector(state => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, isSuccess])

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
    }

    return (
        <div className='heading'>
            <h1 className="heading">Login</h1>
            <p className="sub-heading">Login and start transfer</p>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Email</label>
                        <input type="text" name="email" id="email" placeholder="Enter your email" value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login