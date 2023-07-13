import React from "react";
import { Auth } from "./Auth";
import { useNavigate } from "react-router-dom";

const ProtectedAuth = () => {
    const navigate = useNavigate();

    return (
        <div className="offset-3" style={{}}>
            <p style={{ fontSize: 20 }}>
                Cannot Access Highly Confidential
            </p>
            <button
                className="btn"
                style={{ backgroundColor:' #8CC327',color:'white' ,fontSize: 15 }}
                onClick={() => {
                    Auth.logout(() =>
                        navigate("/HomeUengage", { state: { from: { pathname: "/" } } })
                    );
                }}>
                Log out
            </button>
        </div>
    );
};

export default ProtectedAuth;