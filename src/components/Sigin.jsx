import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sigin.css';
import { Auth } from './Auth';
import { useContext } from 'react';
import { CreateContext } from './CreateContext';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [adminfname, setadminfname] = useState('vasanthrathinam');
    const [adminpword, setadminpword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(CreateContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/Admin')
            .then((response) => response.json())
            .then((adminData) => {
                const admin = adminData.find(
                    (admin) => admin.adminfname === adminfname
                );

                if (admin) {
                    setadminpword(admin.adminpword);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/Admin')
            .then((response) => response.json())
            .then((adminData) => {
                console.log('Admin login');
                const admin = adminData.find(
                    (admin) => admin.adminfname === adminfname && admin.adminpword === adminpword
                );

                if (admin && admin.role === 'admin') {
                    console.log('Admin login1');

                    fetch(`http://localhost:3001/Admin/${admin.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ...admin, login: 1 }), // Pass the modified admin object
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
                else {
                    userlogin();
                }
            });

        const userlogin = () => {
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
                                // Auth.login(() => {
                                navigate('/HomeUengage');
                                // });
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    }
                });

            dispatch({ type: 'LOGIN', payload: { role: 'user' } });
        }
    };

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
