import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import validator from 'validator'; 
import { useAuth } from "../context/AuthContext";
import './SharedStyles.css'; // Import the shared CSS

export default function Login({loggedIn}) {
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        serverErrors: null,
        clientErrors: {}
    });

    const runValidations = () => {
        const errors = {};
        if (formData.email.trim().length === 0) {
            errors.email = 'Email is required';
        } else if (!validator.isEmail(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (formData.password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (formData.password.trim().length < 8 || formData.password.trim().length >= 128) {
            errors.password = 'Password must be between 8 to 128 characters';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = runValidations();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/login', formData);
                localStorage.setItem('token', response.data.token);
                const userResponse = await axios.get('http://127.0.0.1:5000/accounts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                loggedIn()
                navigate('/');
            } catch (err) {
                console.log(err);
                setFormData({ ...formData, serverErrors: err?.response?.data?.errors, clientErrors: {} });
            }
        } else {
            setFormData({ ...formData, clientErrors: errors });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const displayErrors = () => {
        let result;
        if (typeof formData.serverErrors === 'string') {
            result = <p className="error-message">{formData.serverErrors}</p>;
        } else {
            result = (
                <ul className="error-message">
                    {formData.serverErrors.map((ele, i) => (
                        <li key={i}>{ele.msg}</li>
                    ))}
                </ul>
            );
        }
        return result;
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                {formData.serverErrors && displayErrors()}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        value={formData.email}
                        id="email"
                        name="email"
                        onChange={handleChange}
                    />
                    {formData.clientErrors.email && <div className="error-message">{formData.clientErrors.email}</div>}
                    
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                    {formData.clientErrors.password && <div className="error-message">{formData.clientErrors.password}</div>}
                    
                    <input type="submit" value="Submit" />
                </form>
                <Link to="/register">Create an account</Link>
            </div>
        </div>
    );
}
