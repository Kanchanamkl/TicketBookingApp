// src/components/Recentcoach_bookings.jsx
import React, { useState, useEffect } from "react";
import "./CoachBookingCardStyles.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../../StoreContext/StoreContext";
const CoachBookingCard = ({ coach_booking }) => {


  const { role } = useContext(StoreContext);
  const userRole = role;

  useEffect(() => {
    console.log('coach booking:',coach_booking);
  }, [coach_booking]);
  return (
    <div key={coach_booking.id} className="coach-booking-card-container">
      {/* <div className="" > */}
        <div className="profile-img">
          {console.log('coach booking:',coach_booking.id)}

          {coach_booking[userRole === 'MEMBER' ? 'coach' : 'member'].profilePic && (
            <img
              src={coach_booking[userRole === 'MEMBER' ? 'coach' : 'member'].profilePic}
              alt={`${coach_booking[userRole === 'MEMBER' ? 'coach' : 'member'].profilePic}`}
            />
          )}
        </div>
        <div className="details">
          <p className="coach-name">
          <span>{userRole === 'MEMBER' ? 'Coach' : 'Member'} : </span> {coach_booking[userRole === 'MEMBER' ? 'coach' : 'member'].firstName} {coach_booking[userRole === 'MEMBER' ? 'coach' : 'member'].lastName}
          </p>
          <p className="coach_booking-date">Date : {coach_booking.date}</p>
          <p className="coach_booking-time">Time : {coach_booking.startTime} : {coach_booking.endTime}</p>
        </div>
      {/* </div> */}
    </div>
  );
};

export default CoachBookingCard;