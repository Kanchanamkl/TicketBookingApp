import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import icon from "../../assets/images/icon.png";

function Navbar() {
    return (
        <nav class="navbar">
            <div class="nav">
                <div class="logo">
                    <a href="/">
                        <img src={icon} alt="" />
                    </a>
                </div>

                <ul class="menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
