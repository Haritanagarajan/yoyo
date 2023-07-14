import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sigin.css';
import { Auth } from './Auth';
import { useContext } from 'react';
import { CreateContext } from './CreateContext';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(CreateContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/login')
            .then((response) => response.json())
            .then((data) => {
                const user = data.find(
                    (user) => user.fname === username && user.pword === password
                );

                if (user) {
                    if (user.utype === 'Admin') {
                        console.log('Admin login');
                        fetch(`http://localhost:4000/login/${user.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ...user, login: 1 }),
                        })
                            .then(() => {
                                Auth.login(() => {
                                    navigate("/ProductUengage");
                                });
                                
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    } else {
                        console.log('User Login success');
                        fetch(`http://localhost:4000/login/${user.id}`, {
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
                    };
                }
            })
            dispatch({ type: 'LOGIN', payload: { role: 'user' } });
    }
    return (
        <div className="signinpage offset-4 mt-5">
            <form onSubmit={handleLogin}>
                <h3 className="text-center">Login</h3>
                {error && <div className="error">{error}</div>}
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
                    New user? Signup
                </Link>
            </form>
        </div>
    );
};

export default Signin;
