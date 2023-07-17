import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import { useNavigate } from 'react-router-dom';

export default function NavUengage() {
    const [login, setLogin] = useState('false');
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogin(false);
        fetch("http://localhost:3001/Admin?login_like=1")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    const id = data[0].id;
                    fetch(`http://localhost:3001/Admin/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...data[0],
                            login: 0,
                        }),
                    })
                        .then(() => {
                            navigate("Sigin");
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        fetch("http://localhost:3001/login?login_like=1")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    const id = data[0].id;
                    fetch(`http://localhost:3001/login/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...data[0],
                            login: 0,
                        }),
                    })
                        .then(() => {
                            navigate("Sigin");
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#" >uEngage</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav offset-4" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            <Link className="nav-link ps-4" aria-current="page" to="HomeUengage">Home</Link>
                            <Link className="nav-link pe-4" to="ProductUengage">Products</Link>
                            <Link className="nav-link pe-4" to="PartnersUengage">Partners</Link>
                            <Link className="nav-link pe-4" to="SpotlightUengage">Spotlight</Link>
                            <Link className="nav-link pe-3" to="WehireUengage">We're hiring!</Link>
                            <Link className="nav-link pe-3" to="Task">Task</Link>
                            <Link className="nav-link loginbtn" to="Sigin">Login</Link>
                            <Link className="nav-link loginbtn" to="Sigin" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

