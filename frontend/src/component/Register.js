import React, { useState } from 'react';
import axiosInstance from '../axiosSetup';
import { useNavigate,Link } from 'react-router-dom';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/register', { name, email, password });
            if (response && response.data.statusCode == 200) {
                const  token  = response.data.data.token;

                // Store token in localStorage
                localStorage.setItem('token', token);

                // Navigate to the home page or any other page
                navigate('/post');

            }
            setMessage(response.data.message);
        } catch (error) {
            console.log(error.response.data.message)
            setMessage(error.response.data.message)
            // setMessage('Error registering use111r');
        }
    };

    return (
        <div  className="container">
            <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="textbox">
                    <label htmlFor='name'>Name:</label>
                    <input
                        type="text"
                        value={name}
                         id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='textbox'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        value={email}
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='textbox'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account? <Link to="/">Login here</Link></p>
            </div>

        </div>
    );
}

export default Register;
