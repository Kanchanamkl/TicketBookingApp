import React from "react";
import "./FooterStyels.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; All rights reserved | TicketStudio | {new Date().getFullYear()}</p>
   
      </div>
    </footer>
  );
};

export default Footer;