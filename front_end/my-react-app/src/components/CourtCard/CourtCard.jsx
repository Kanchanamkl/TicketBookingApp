import React, { useContext } from "react";
import "./CourtCardStyles.scss";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";

const CourtCard = ({ court }) => {
    const navigate = useNavigate();
    const { updateSelectedCourt } = useContext(StoreContext);

    const handleNavigate = () => {
        updateSelectedCourt(court);
        navigate("/book-court");
    };

    return (
        <div className="court-card">
            <img
                src={court.courtImg}
                alt={court.courtImg}
                className="court-img"
            />
            {/* <p className="court-id">Court {court.courtId}</p> */}
            <h4 className="court-name">{court.courtName}</h4>
            <p>{court.courtType}</p>
            <div className="button-container">
                <div className="button-container">
                    <button
                        className="appointment-button"
                        onClick={handleNavigate}
                    >
                        <MdAssignmentAdd className="appointment-icon" /> Make an
                        Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourtCard;
