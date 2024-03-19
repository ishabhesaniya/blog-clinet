import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import './signin.css';

function Login({ isLoggedIn, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar function

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/signin', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === 'Success') {
                    setIsLoggedIn(true);
                    navigate('/home');
                    enqueueSnackbar('sucess', { variant: 'success' }); // Show error notification

                } else {
                    enqueueSnackbar('Invalid email or password', { variant: 'error' }); // Show error notification
                }
            })
            .catch(err => console.log(err));
    };

    // Redirect to home if user is already logged in
    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="wrapper">
           <h2>Sign-in</h2>
            <div className="form-wrapper sign-in">
               
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="signUp-link">
                        <p>Don't have an account? <Link to="/register" className="signUpBtn-link">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
