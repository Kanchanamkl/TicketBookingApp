import React, { useState, useEffect } from "react";
import "./CourtBookingStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CourtCard from "../../../components/CourtCard/CourtCard";
import court_list from "../../../assets/tempData/court_list";
import axios from "axios";

const CourtBooking = () => {

    const [courts, setCourts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/court-bookings/courts")
            .then(response => {
                setCourts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the courts!", error);
            });
    }, []);

    return (
        <div className="court-booking-container">
            <SectionContainer title="Book a Court">
                <div className="court-list">
                    {courts.map((court) => (
                        <CourtCard key={court.id} court={court} />
                    ))}
                </div>
            </SectionContainer>
        </div>
    );
};

export default CourtBooking;
