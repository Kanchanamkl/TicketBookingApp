import React from "react";
import "./FooterStyels.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; All rights reserved | CricketPulse | {new Date().getFullYear()}</p>
        <div className="contact-details">
          <p>Contact Us: </p>
          <p>Email: contact@cricketpulse.com</p>
          <p>Phone: +94 77 456 34 32 | +94 11 345 54 54</p>
          <p>Address: No.212, Galle Road, Colombo 7</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;