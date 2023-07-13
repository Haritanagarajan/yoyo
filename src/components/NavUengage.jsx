import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Nav.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Auth } from "./Auth";


export default function NavUengage() {
    let navigate = useNavigate();
    let location = useLocation();
    console.log({ location });

    let { from } = location.state || { from: { pathname: "/" } };
    console.log(from);
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
                            <button type='btn' data-bs-toggle="modal" data-bs-target="#exampleModal" className="nav-link loginbtn ">Login</button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Modal for login button */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login to Your Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* Formik validations for the form */}
                            <Formik
                                initialValues={{
                                    Username: '',
                                    password: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    fetch("http://localhost:4000/login")
                                        .then((response) => response.json())
                                        .then((data) => {
                                            const registeruser = data.find(
                                                (user) =>
                                                    user.fname === values.Username &&
                                                    user.pword === values.password
                                            );
                                            console.log(registeruser);

                                            if (registeruser) {
                                                if (registeruser.utype === "Admin") {
                                                    console.log("Admin login");
                                                    // Perform actions specific to admin user
                                                } else {
                                                    console.log("Login success");
                                                    const id = registeruser.id;
                                                    fetch(`http://localhost:4000/login/${id}`, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            ...registeruser,
                                                            login: 1,
                                                        }),
                                                    })
                                                        .then(() => {
                                                            Auth.login(() => {
                                                                navigate(from);
                                                            });
                                                        })
                                                        .catch((error) => {
                                                            console.error("Error:", error);
                                                        });
                                                }
                                            } else {
                                                console.log("Login failed");
                                            }
                                        })
                                        .catch((error) => {
                                            console.error("Error:", error);
                                        });
                                }}

                            >
                                <Form>
                                    <div className="formelements mb-3">
                                        <label htmlFor="Username" className="form-label">Username</label>
                                        <Field type="text" className="form-control" id="Username" name="Username" />
                                        <ErrorMessage name="Username" component="div" className="error" />
                                    </div>
                                    <div className="formelements mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <Field type="password" className="form-control" id="password" name="password" />
                                        <ErrorMessage name="password" component="div" className="error" />
                                    </div>
                                    <div className="formelements mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                                        <ErrorMessage name="confirmPassword" component="div" className="error" />
                                    </div>
                                    <button type="submit" className="btn submitbtn">Login</button>
                                    <Link className="signup offset-5 pt-3" to="SignupUengage">New user? Signup</Link>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Formik validation schema for login form
const validationSchema = Yup.object().shape({
    Username: Yup.string().required(' Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});