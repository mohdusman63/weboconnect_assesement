import React, { useState } from 'react';
import axiosInstance from '../axiosSetup';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/login', { email, password });
            console.log(response.data)
            if (response && response.data.statusCode == 200) {
                const  token  = response.data.data.token;

                // Store token in localStorage
                localStorage.setItem('token', token);

                // Navigate to the home page or any other page
                navigate('/post');

            }


        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="textbox">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="textbox">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn">Login</button>
                    <Link to="/register" className="forgot">Register Users?</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
