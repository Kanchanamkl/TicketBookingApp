import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUserMd, FaUserCircle } from "react-icons/fa";

import {
    FaAddressBook,
    FaShoppingCart,
    FaCartArrowDown,
    FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { PiCricketFill } from "react-icons/pi";
import { IconContext } from "react-icons/lib";
import { ImProfile } from "react-icons/im";
import { StoreContext } from "../../StoreContext/StoreContext";

import {
    MdAssignmentAdd,
    MdLogout,
    MdSportsCricket,
    MdOutlinePendingActions,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import "./SideBarStyles.scss";
import UserProfileCard from "../../components/ProfileCard/ProfileCard";

const SideBar = () => {
    const {
        isLoggedIn,
        handleLogout,
        firstName,
        lastName,
        role,
        username,
        profilePic,
    } = useContext(StoreContext);

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const [showProfileCard, setShowProfileCard] = useState(false);

    const toggleProfileCard = () => {
        setShowProfileCard((prevState) => !prevState);
    };

    const navigate = useNavigate();

    const confirmLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        });

        if (result.isConfirmed) {
            handleLogout();
        }
    };

    const handleUserIconClick = () => {
        setShowProfileCard(!showProfileCard);
    };

    const handleOutsideClick = (e) => {
        if (e.target.closest(".user-profile-card") === null) {
            setShowProfileCard(false);
        }
    };

    return (
        <>
            <IconContext.Provider
                value={{ color: "#fff" }}
                onClick={handleOutsideClick}
            >
                <div className="dash-board-navbar">
                    <Link to="#" className="menu-bars">
                        <FaBars onClick={showSidebar} />
                    </Link>
                    <div className="nav-bar-right">
                        {role === "MEMBER" && (
                            <button
                                onClick={() => navigate("/court-bookings")}
                                className="nav-item-new-apointment"
                            >
                                <Link to="/court-bookings">
                                    <MdAssignmentAdd size={20} />
                                </Link>
                                <span>Book a Court</span>
                            </button>
                        )}

                        {role === "MEMBER" && (
                            <button
                                onClick={() => navigate("/coach-bookings")}
                                className="nav-item-new-apointment"
                            >
                                <Link to="/coach-bookings">
                                    <FaAddressBook size={19} />
                                </Link>
                                <span>Book a Coach</span>
                            </button>
                        )}

                        <li className="nav-item" onClick={handleUserIconClick}>
                            <Link onClick={toggleProfileCard}>
                                <FaUser />
                                {showProfileCard && (
                                    <UserProfileCard
                                        profile_icon={profilePic}
                                        name={`${firstName} ${lastName}`}
                                        role={role}
                                        onClose={() =>
                                            setShowProfileCard(false)
                                        }
                                    />
                                )}
                            </Link>
                        </li>
                    </div>
                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul onClick={showSidebar} className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiOutlineClose />
                            </Link>
                        </li>

                        {isLoggedIn && (
                            <>
                                {role === "COACH" && (
                                    <>
                                        <li className="side-item">
                                            <Link to="/dashboard">
                                                <FaHome />
                                                <span> Dashboard </span>
                                            </Link>
                                        </li>

                                        <li className="side-item">
                                            <Link to="/sessions">
                                                <PiCricketFill size={20} />
                                                <span> All Sessions</span>
                                            </Link>
                                        </li>
                                        <li className="side-item">
                                            <Link to="/profile">
                                                <FaUserCircle />
                                                <span>Profile </span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {role === "MEMBER" && (
                                    <>
                                        <li className="side-item">
                                            <Link to="/dashboard">
                                                <FaHome size={20} />
                                                <span> Dashboard </span>
                                            </Link>
                                        </li>

                                        <li className="side-item">
                                            <Link to="/member-court-booking-details">
                                                <MdAssignmentAdd size={20} />
                                                <span>Court Bookings</span>
                                            </Link>
                                        </li>
                                        <li className="side-item">
                                            <Link to="/member-coach-booking-details">
                                                <MdSportsCricket size={20} />
                                                <span>Coach Bookings</span>
                                            </Link>
                                        </li>
                                        <li className="side-item">
                                            <Link to="/profile">
                                                <FaUserCircle size={20} />
                                                <span>Profile </span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {role === "ADMIN" && (
                                    <>
                                        <li className="side-item">
                                            <Link to="/dashboard">
                                                <FaHome />
                                                <span> Dashboard </span>
                                            </Link>
                                        </li>

                                        <li className="side-item">
                                            <Link to="/admin-coach-bookings">
                                                <PiCricketFill size={20} />
                                                <span>Coach Bookings</span>
                                            </Link>
                                        </li>
                                        <li className="side-item">
                                            <Link to="/admin-court-booking">
                                                <FaAddressBook />
                                                <span>Court Bookings</span>
                                            </Link>
                                        </li>
                                        <li className="side-item">
                                            <Link to="/users">
                                                <FaUsers />
                                                <span>Users</span>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={confirmLogout}
                                className="login-out-btn"
                            >
                                <span>
                                    <MdLogout />
                                </span>
                            </button>
                        ) : (
                            <li className="side-item">
                                <Link to="/login">
                                    <span>Login</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default SideBar;
