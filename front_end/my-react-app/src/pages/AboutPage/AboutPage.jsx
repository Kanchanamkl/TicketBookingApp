import React from "react";
import "./AboutPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import aboutbg from "../../assets/images/aboutbg.mp4";

function AboutPage() {
    return (
        <div>
            <Navbar />
            <div className="about-background">
                <video
                    src={aboutbg}
                    id="bgvideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div className="about-content">
                    <div className="about-heading">
                        <h1>
                            About <br />
                            Cricket Pulse
                        </h1>
                    </div>
                    <div className="about-section">
                        <p>
                            Cricket Pluse is more than just a platform, it’s a
                            community built around the love of cricket. Founded
                            by cricket enthusiasts, we aim to connect players,
                            coaches, and fans, creating a network that shares in
                            the excitement, tradition, and evolution of the
                            game. We are driven by a passion to bring people
                            closer to cricket, offering a space where everyone
                            from beginners to seasoned professionals can feel
                            connected and inspired. At Cricket Pluse, we
                            understand that cricket is not just a sport,it’s a
                            way of life. Our mission is to support this vibrant
                            community, fostering relationships and opportunities
                            that help cricket enthusiasts learn, grow, and
                            thrive together. Join us as we work to enrich the
                            cricket experience and uphold the values and
                            traditions that make the game so special.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
