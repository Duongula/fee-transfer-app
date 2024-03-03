import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/user/userSlice";
import { useSelector } from "react-redux";


function Register() {

    const { user, isSuccess } = useSelector(state => state.user.user)

    const dispath = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard")
        }
    }, [user, isSuccess])

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispath(registerUser({
            name, email, password
        }))
    }

    return (
        <div className='heading'>
            <h1 className="heading">Register</h1>
            <p className="sub-heading">Please create an account</p>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" value={name}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
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

export default Register