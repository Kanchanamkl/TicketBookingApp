import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFoundStyles.scss";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="page-not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={handleGoHome}>Go Home</button>
        </div>
    );
};

export default PageNotFound;