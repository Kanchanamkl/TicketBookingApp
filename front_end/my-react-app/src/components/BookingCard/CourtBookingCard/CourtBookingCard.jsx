// src/components/Recentcoach_bookings.jsx
import React, { useState, useEffect } from "react";
import "./CoachBookingCardStyles.scss";
import { useNavigate } from "react-router-dom";
const CourtBookingCard = ({ court_booking }) => {
    // useEffect(() => {
    //   console.log('coach booking:',coach_booking);
    // }, [coach_booking]);
    return (
        <div className="coach-booking-card-container">
            <div className="client_coach_booking_card" key={court_booking.id}>
                <div className="profile-img">
                    {console.log("coach booking:", court_booking.id)}
                    {court_booking.court.courtImg && (
                        <img
                            src={court_booking.court.courtImg}
                            alt={`${court_booking.court.courtImg}`}
                        />
                    )}
                    {/* <img
            src={coach_booking.coach.user.profilePic}
            alt={coach_booking.coach.user.profilePic}
          /> */}
                </div>
                <div className="details">
                    <h4 className="coach-name">
                        Court : {court_booking.court.courtName}{" "}
                    </h4>
                    <p className="coach_booking-date">
                        Date : {court_booking.date}
                    </p>
                    <p className="coach_booking-time">
                        Time : {court_booking.startTime} :{" "}
                        {court_booking.endTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CourtBookingCard;
