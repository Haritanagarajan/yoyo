//import libraries
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sigin.css';

//signin component
const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //checks with the signup details(username and password)
    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/login')
            .then((response) => response.json())
            .then((userData) => {
                const user = userData.find(
                    (user) => user.fname === username && user.pword === password
                );
                if (user && user.role === 'user') {
                    console.log('User Login success');
                    fetch(`http://localhost:3001/login/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...user, login: 1 }),
                    })
                        .then(() => {
                            navigate('/HomeUengage');
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            });
    };

    return (
        <div className="signinpage offset-4 mt-5">
            <form onSubmit={handleLogin}>
                <h3 className="text-center">Login</h3>
                <div className="formelements mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="formelements mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit" className="btn submitbtn">
                    Login
                </button>
                <Link className="signup offset-5 pt-3" to="/SignupUengage">
                    New user? <br />
                </Link>
                <Link className="signup offset-4 pt-3" to="/AdminLogin">
                    Signup as Admin?
                </Link>
            </form>
        </div>
    );
};

export default Signin;
