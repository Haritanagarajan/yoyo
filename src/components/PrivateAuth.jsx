import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Auth } from "./Auth";


const PrivateAuth = ({ children }) => {
    let location = useLocation();
    return Auth.isAuthenticated ? (
        children
    ) : (
        <Navigate to="/Sigin" state={{ from: location }} />
    );
};

export default PrivateAuth;