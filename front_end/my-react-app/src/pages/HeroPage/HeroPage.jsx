import React from "react";
import "./HeroPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />

            <div className="hero-background">
        

                <div className="hero-content">
                    <div className="hero-heading">
                        <h1>TicketStudio</h1>
                    </div>
                    <div className="hero-tagline">
                        <h3>Bringing the Tickets to You...</h3>
                    </div>
                    <div className="hero-button-section">
                        <button
                            className="hero-button"
                            onClick={() => navigate("/venderregister")}
                        >
                            Join as Vender
                        </button>
                        <button
                            className="hero-button"
                            onClick={() => navigate("/customerregister")}
                        >
                            Join as Customer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;
