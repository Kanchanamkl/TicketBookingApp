import { useState, useEffect } from "react";
import "./CoachBookingStyles.scss";
import axios from "axios";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CoachCard from "../../../components/CoachCard/CoachCard";
import coach_list from "../../../assets/tempData/coach_list";

function CoachBooking() {
  
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/users/get-all-coaches")
            .then(response => {
                setCoaches(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the coaches!", error);
            });
    }, []);
    return (
        <div className="coach-booking-container">
            <SectionContainer title="Book a Coach">
                <div className="coach-list">
                    {coaches.map((coach) => (
                        <CoachCard key={coach.id} coach={coach} />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
}

export default CoachBooking;
