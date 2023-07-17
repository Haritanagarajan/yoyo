import React, { useState } from "react";
import "../styles/Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [pword, setpword] = useState("");
    const [cpword, setcpword] = useState("");
    const [errors, seterrors] = useState({});
    const [login, setlogin] = useState();
    const [role, setrole] = useState("user");

    const handleRegister = (e) => {
        e.preventDefault();

        // Reset errors
        seterrors({});

        // Perform validation
        const validationErrors = {};

        if (fname.trim() === "") {
            validationErrors.fname = "Required Field";
        } else if (!isValidName(fname)) {
            validationErrors.fname = "First name should only contain alphabets";
        }

        if (lname.trim() === "") {
            validationErrors.lname = "Required Field";
        } else if (!isValidName(lname)) {
            validationErrors.lname = "Last name should only contain alphabets";
        }

        if (email.trim() === "") {
            validationErrors.email = "Required Field";
        } else if (!isValidEmail(email)) {
            validationErrors.email = "Enter a valid email";
        }

        if (pword === "") {
            validationErrors.pword = "Required Field";
        } else if (!isValidPassword(pword)) {
            validationErrors.pword =
                "Must contain minimum 1 Lowercase,Uppercase and digit";
        }

        if (cpword === "") {
            validationErrors.cpword = "Required Field";
        } else if (pword !== cpword) {
            validationErrors.cpword = "Passwords do not match";
        }

        if (role === "") {
            validationErrors.utype = "Required Field";
        }

        if (Object.keys(validationErrors).length === 0) {
            const newUser = {
                fname,
                lname,
                email,
                pword,
                role,
                login
            };

            //creating user details when register btn is invoked

            fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((response) => {
                    if (response.ok) {

                        setfname("");
                        setlname("");
                        setemail("");
                        setpword("");
                        setcpword("");
                        setlogin("");
                        setrole("");
                        console.log("Registration Successful");
                    } else {
                        throw new Error("Registration failed");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            seterrors(validationErrors);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (pword) => {
        return (
            pword.length >= 8 &&
            /[a-z]/.test(pword) &&
            /[A-Z]/.test(pword) &&
            /\d/.test(pword) &&
            /[!@#$%^&*]/.test(pword)
        );
    };

    const isValidName = (name) => {
        const nameRegex = /^[A-Za-z]{1,30}$/;
        return nameRegex.test(name);
    };

    return (
        <div className="container2 offset-4" id="cont" style={{ marginBottom: '250px' }}>
            <div className="row">
                <div className="col-12 py-1 shadow  mt-5">
                    <h3 className="ms-4 pb-3" style={{ color: '#978F8F' }}>Sign Up with uEngage</h3>
                    <form className="registration-form" onSubmit={handleRegister} style={{ color: '#978F8F' }}>
                        <div className="form-group" >
                            <input
                                type="text"
                                id="fname"
                                className={`form-control ${errors.fname ? "is-invalid" : ""
                                    }`}
                                placeholder="First name"
                                value={fname}
                                onChange={(e) => setfname(e.target.value)}
                            />
                            {errors.fname && (
                                <div className="invalid-feedback">{errors.fname}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="lname"
                                className={`form-control ${errors.lname ? "is-invalid" : ""
                                    }`}
                                placeholder="Last name"
                                value={lname}
                                onChange={(e) => setlname(e.target.value)}
                            />
                            {errors.lname && (
                                <div className="invalid-feedback">{errors.lname}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>
                        <div>
                            <noscript>
                                <label className="text-center ps-5 ms-2">
                                    <input style={{ paddingTop: '10px' }}
                                        type="text"
                                        value="user"
                                        readonly
                                        checked={role === "user"}
                                        onChange={(e) => setrole(e.target.value)}
                                    />
                                </label>
                            </noscript>
                           
                        </div>
                        {errors.userType && (
                            <div className="invalid-feedback">{errors.role}</div>
                        )}

                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${errors.pword ? "is-invalid" : ""
                                    }`}
                                placeholder="Password"
                                value={pword}
                                onChange={(e) => setpword(e.target.value)}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.pword}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`form-control ${errors.cpword ? "is-invalid" : ""
                                    }`}
                                placeholder="Confirm password"
                                value={cpword}
                                onChange={(e) => setcpword(e.target.value)}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">{errors.cpword}</div>
                            )}
                        </div>

                        <button className="register" type="submit">
                            Register
                        </button>
                        <p className="mt-3 text-center" style={{ fontSize: '13px', color: '#978F8F' }}>
                            Already have an account?{" "}
                            <Link to="/Sigin" className="text-black w-25">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;