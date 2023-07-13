import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';
const NavUengage = () => {
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
                            <Link className="nav-link ps-4" aria-current="page" to="/HomeUengage">Home</Link>
                            <Link className="nav-link pe-4" to="ProductsUengage">Products</Link>
                            <Link className="nav-link pe-4" to="PartnersUengage">Partners</Link>
                            <Link className="nav-link pe-4" to="SpotlightUengage">Spotlight</Link>
                            <Link className="nav-link pe-3" to="WehireUengage">We're hiring!</Link>
                            <button type='btn' data-bs-toggle="modal" data-bs-target="#exampleModal" className="nav-link loginbtn ">Login</button>
                        </div>
                    </div>
                </div>

                {/* //modal for login button */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                hello
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}





export default NavUengage