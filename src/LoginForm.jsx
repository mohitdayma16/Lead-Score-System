import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const submitHandler = async (event) => {
        event.preventDefault();

        const res = await fetch(`${API_BASE_URL}/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
        });

        const newRes = await res.json();
        if (res.ok && newRes.success) {
            toast.success("Logged In");
            navigate("/");
        } else {
            toast.error("Invalid User");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={submitHandler} className="login-form">
                <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email Address"
                        name="email"
                        className="input-field"
                    />
                </div>

                <div className="form-group relative">
                    <label>Password <span className="required">*</span></label>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        name="password"
                        className="input-field"
                    />
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    <Link to="#" className="forgot-password">
                        Forgot Password
                    </Link>
                </div>

                <button type="submit" className="submit-btn">
                    Sign In
                </button>
            </form>
        </div>
    );
}
