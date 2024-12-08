import React from "react";
import "./HeroPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import bgvideo from "../../assets/images/bgvideo.mp4";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />

            <div className="hero-background">
                <video
                    src={bgvideo}
                    id="bgvideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div className="hero-content">
                    <div className="hero-heading">
                        <h1>Cricket Pulse</h1>
                    </div>
                    <div className="hero-tagline">
                        <h3>Bringing the Game Closer to You...</h3>
                    </div>
                    <div className="hero-button-section">
                        <button
                            className="hero-button"
                            onClick={() => navigate("/coachregister")}
                        >
                            Join as a Coach
                        </button>
                        <button
                            className="hero-button"
                            onClick={() => navigate("/playerregister")}
                        >
                            Join as a player
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;
