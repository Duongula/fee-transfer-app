import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/user/userSlice";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import './Login.scss'

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
        toast.success("Login Succesfully!");
        dispatch(loginUser({ email, password }))
    }

    return (
        <>
            <div className="wrapper-login">
                <div className="logo">
                    <img src="https://i.pinimg.com/564x/9e/4d/7f/9e4d7f6d814054bf75611ebf8ed0d1ee.jpg" alt="" />
                </div>
                <div className="text-center mt-4 name">
                    Money Transfer
                </div>
                <form className="p-3 mt-3" onSubmit={handleSubmit}>
                    <div className="form-field d-flex align-items-center input-group">
                        <span className="far fa-user"></span>
                        <input type="text" name="email" id="email" placeholder="Enter your email" value={email}
                            onChange={handleChange} />
                    </div>
                    <div className="form-field d-flex align-items-center input-group">
                        <span className="fas fa-key"></span>
                        <input type="password" name="password" id="password" placeholder="Enter your password" value={password}
                            onChange={handleChange} />
                    </div>
                    <button className="btn mt-3" type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login