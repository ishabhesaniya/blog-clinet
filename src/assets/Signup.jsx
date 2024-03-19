import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signin.css';

function Signup({ isLoggedIn }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one number and one special character.');
            setLoading(false);
            return;
        }

        axios.post('http://localhost:5000/register', { name, email, password })
            .then(result => {
                console.log(result);
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                setError('Failed to register. Please try again.');
                setLoading(false);
                console.error(err);
            });
    };

    // Redirect to home if user is already logged in
    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="wrapper">
            <div className="form-wrapper sign-in">
                <form onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            autoComplete="off"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                    <div className="signUp-link">
                        <p>Already have an account? <Link to="/" className="signUpBtn-link">Sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
