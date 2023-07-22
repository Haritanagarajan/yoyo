//import libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';

//nav component
export default function NavUengage() {
    const [login, setLogin] = useState('false');
    const [username, setusername] = useState([]);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    //invoked when logout btn is clicked
    const handleLogout = () => {
        setLogin(false);
        //checks for any logi is 1 in admin and makes as login 0
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
        //checks for any logi is 1 in user and makes as login 0
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

    //for making visible which user is logging in
    const fetchData = () => {
        fetch('http://localhost:3001/login?login_like=1')
            .then((response) => response.json())
            .then((data) => {
                setusername(data);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link><i className="pi pi-spin pi-prime" style={{ fontSize: '2rem', color: ' #8CC327' }}></i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav offset-4" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            <Link className="nav-link ps-4" aria-current="page" to="HomeUengage">Home</Link>
                            <Link className="nav-link pe-4" to="ProductUengage">Tasks</Link>
                            <Link className="nav-link pe-4" to="PartnersUengage">Partners</Link>
                            <Link className="nav-link pe-4" to="SpotlightUengage">Spotlight</Link>
                            <Link className="nav-link pe-3" to="WehireUengage">Yayeee!</Link>
                            <Link className="nav-link pe-3" to="Task">Progress</Link>
                            <Link className="nav-link loginbtn" to="Sigin"><i class="fa-solid fa-right-to-bracket"></i></Link>
                            <Link className="nav-link loginbtn" to="Sigin" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></Link>
                            <p style={{ color: 'white', fontSize: '15px' }} className='text-center'>Welcome to Yoyo!.....</p>
                            {/* for making visible which user is logging in */}
                            {username.map((users) => (
                                <p style={{ color: 'white', fontSize: '15px' }}>{users.fname}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

