import React from "react";
import "./ProfileCardStyles.scss";
import { IoCloseCircleOutline } from "react-icons/io5";

function UserProfileCard({ name, profile_icon, role, onClose }) {
return (
    <div className="user-profile-card">
        <button className="close-button" onClick={onClose}>
            <IoCloseCircleOutline size={20} color="#000" />
        </button>
        <div className="profile-container">
            <div className="user-icon">
                <img src={profile_icon} alt="User" />
            </div>
            <div className="user-details">
                <p className="user-name">{name}</p>
                <p className="user-role">{role}</p>
            </div>
        </div>
    </div>
);
}

export default UserProfileCard;
