import { createContext, useEffect } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [userId, setUserId] = useState(
        () => localStorage.getItem("userId") || ""
    );
    const [username, setUsername] = useState(
        () => localStorage.getItem("username") || ""
    );
    const [firstName, setFirstName] = useState(
        () => localStorage.getItem("firstName") || ""
    );
    const [lastName, setLastName] = useState(
        () => localStorage.getItem("lastName") || ""
    );
    const [role, setRole] = useState(() => localStorage.getItem("role") || "");

    const [profilePic, setProfilePic] = useState(
        () => localStorage.getItem("profilePic") || ""
    );

    const [selectedCoach, setSelectedCoach] = useState(null);
    const updateSelectedCoach = (coach) => {
        setSelectedCoach(coach);
    };
    const [selectedCourt, setSelectedCourt] = useState(null);
    const updateSelectedCourt = (court) => {
        setSelectedCourt(court);
    };
    const [selectedSlots, setSelectedSlots] = useState([]);

    const addSlot = (startTime, endTime, description) => {
        setSelectedSlots(prevSlots => [
          ...prevSlots,
          { startTime, endTime, description }
        ]);
      };

      

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
        localStorage.setItem("username", username);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("role", role);
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("userId", userId);
        localStorage.setItem("selectedCoach", JSON.stringify(selectedCoach));

    }, [isLoggedIn,username, firstName, lastName, role,profilePic, userId, selectedCoach, selectedCourt, selectedSlots]);


    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setRole("");
        setProfilePic("");
        updateSelectedCoach("")
        updateSelectedCourt("")
        setSelectedSlots([])
        localStorage.clear();
        navigate("/");
    };

    const contextValue = {
        isLoggedIn,
        userId,
        username,
        profilePic,
        selectedCoach,
        selectedCourt,
        selectedSlots,  
        firstName,
        lastName,
        role,
        setUserId,
        setIsLoggedIn,
        setUsername,
        setFirstName,
        setLastName,
        setRole,
        handleLogout,
        setProfilePic,
        updateSelectedCoach,
        updateSelectedCourt,
        setSelectedSlots,
        addSlot
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
export default StoreContextProvider;
