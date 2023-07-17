import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sigin.css';
import { Auth } from './Auth';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/Admin')
            .then((response) => response.json())
            .then((admindata) => {
                const adminfname = 'vasanthrathinam';
                const adminpword = 'VASANTH@123';
                const admin = admindata.find(
                    (admin) =>
                        admin.adminfname === adminfname && admin.adminpword === adminpword
                );

                if (admin) {
                    console.log('Admin login1');
                    fetch(`http://localhost:3001/Admin/${admin.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...admin, login: 1 }),
                    })
                        .then(() => {
                            Auth.login(() => {
                                navigate('/ProductUengage');
                            });
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
                <h3 className="text-center">Admin Login</h3>
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
                    />
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
                    />
                </div>
                <button type="submit" className="btn submitbtn">
                    Login
                </button>
                <Link className="signup offset-5 pt-3" to="/SignupUengage">
                    Back to User? Signup
                </Link>
            </form>
        </div>
    );
};

export default AdminLogin;
