import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./ProfileStyles.scss";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import axios from "axios";
import { StoreContext } from "../../StoreContext/StoreContext";

const Profile = () => {
    const { userId } = useContext(StoreContext);
    // const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setuserInfo] = useState({
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        role: "",
        mobile: "",
        email: "",
        birthday: "",
        profilePic: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/api/users/get-user?id=${userId}`);
                const userData = response.data;
                setuserInfo({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    country: userData.country || "",
                    city: userData.city || "Colombo",
                    role: userData.role || "",
                    mobile: userData.mobile || "0760345876",
                    email: userData.username,
                    birthday: userData.birthday || "13-06-2000",
                    profilePic: userData.profilePic,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // const handleEditToggle = () => {
    //     setIsEditing(!isEditing);
    // };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setuserInfo({ ...userInfo, [name]: value });
    // };

    // const handleProfileUpdate = () => {
    //     console.log("Profile updated", userInfo);
    //     setIsEditing(false);
    // };

    return (
        <div className="profile-page">
            <SectionContainer title="Profile">
                <div className="profile-section">
                    <div className="left-container">
                        <div className="profile-picture-card">
                            <img
                                src={userInfo.profilePic}
                                alt="Profile"
                            />
                            {/* {isEditing && (
                                <input
                                    type="file"
                                    name="profilePic"
                                    onChange={(e) =>
                                        setuserInfo({
                                            ...userInfo,
                                            profilePic: URL.createObjectURL(
                                                e.target.files[0]
                                            ),
                                        })
                                    }
                                />
                            )} */}

                            <h1>
                                {userInfo.firstName} {userInfo.lastName}
                            </h1>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="bio-section">
                            {/* {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={userInfo.firstName}
                                        placeholder="First Name"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={userInfo.lastName}
                                        placeholder="Last Name"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={userInfo.country}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        value={userInfo.city}
                                        placeholder="City"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="role"
                                        value={userInfo.role}
                                        placeholder="Role"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={userInfo.mobile}
                                        placeholder="Mobile"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        placeholder="Username"
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={userInfo.birthday}
                                        placeholder="Birthday"
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleProfileUpdate}>
                                        Save
                                    </button>
                                </>
                            ) : ( */}
                                <>
                                    <p>
                                        <label style={{ marginRight: "27px" }}>
                                            First Name
                                        </label>
                                        :{"   "}
                                        {userInfo.firstName}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "30px" }}>
                                            Last Name
                                        </label>
                                        :{"   "}
                                        {userInfo.lastName}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "35px" }}>
                                            Username
                                        </label>
                                        :{"   "}
                                        {userInfo.email}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "64px" }}>
                                            Mobile
                                        </label>
                                        :{"   "}
                                        {userInfo.mobile}
                                    </p>

                                    <p>
                                        <label style={{ marginRight: "50px" }}>
                                            Birthday
                                        </label>
                                        :{"   "}
                                        {userInfo.birthday}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "84px" }}>
                                            Role      
                                        </label>
                                        :{"   "}
                                        {userInfo.role}
                                    </p>
                                    <p>
                                        <label style={{ marginRight: "80px" }}>
                                            City:{"  "}
                                        </label>
                                        : {userInfo.city}
                                    </p>

                                    {/* <button onClick={handleEditToggle}>
                                        Edit
                                    </button> */}
                                </>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default Profile;