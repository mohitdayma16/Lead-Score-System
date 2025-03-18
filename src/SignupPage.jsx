import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'


const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        // Check if all form fields are filled
        for (let key in formData) {
            if (!formData[key]) {
                toast.error(`${key} is required.`);
                return;
            }
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // Check password length
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email.toLowerCase(),
            password: formData.password,
        };

        console.log('Submitting user data:', userData);

        try {
            // Check if API URL is correctly set in the environment variable
            const apiUrl = process.env.REACT_APP_API_URL;
            if (!apiUrl) {
                toast.error('API URL is not set.');
                return;
            }

            const response = await fetch(`${apiUrl}/createUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log('Server Response:', result);

            if (response.ok) {
                toast.success('Account Created Successfully!');
                setIsLoggedIn(true);
                navigate('/');
            } else {
                toast.error(result.message || 'Signup failed. Try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Network error! Please try again.');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label className="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
