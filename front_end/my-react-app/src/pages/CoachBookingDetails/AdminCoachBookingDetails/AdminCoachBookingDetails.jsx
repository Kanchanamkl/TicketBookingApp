import React, { useState, useEffect, useContext } from "react";
import CoachBookingCard from "../../../components/BookingCard/CoachBookingCard/CoachBookingCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import axios from "axios";
import { StoreContext } from "../../../StoreContext/StoreContext";
import "./AdminCoachBookingDetailsStyles.scss";

const AdminCoachBookingDetails = () => {
  const [coachSessions, setcoachSessions] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const { userId } = useContext(StoreContext);

useEffect(() => {
    const fetchCoachSessions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/coach-bookings/get_all_coach_bookings");
            setcoachSessions(response.data);
        } catch (error) {
            console.error("Error fetching coach sessions:", error);
        }
    };

    fetchCoachSessions();
}, []);

const getStatus = (date) => {
  const today = new Date();
  const bookingDate = new Date(date);

  if (bookingDate < today) {
    if (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    ) {
      return "TODAY";
    } else {
      return "COMPLETED";
    }
  } else {
    // return "UPCOMING";
    if (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    ) {
      return "TODAY";
    } else {
      return "UPCOMING";
    }
  }
};

  const filteredcoachSessions = coachSessions.filter((booking) => {
    const status = getStatus(booking.date);
    if (filter === "ALL") return true;
    return status === filter;
  });

  const tableHeaders = ["Session ID", "Coach","Member", "Date", "Time", "Status"];
  const tableBody = filteredcoachSessions.map((booking) => ({
    id: booking.id,
    coach: `${booking.coach.firstName} ${booking.coach.lastName}`,
    member: `${booking.member.firstName} ${booking.member.lastName}`,
    date: new Date(booking.date).toLocaleDateString(),
    time: `${booking.startTime} - ${booking.endTime}`,
    status: getStatus(booking.date),
  }));

  return (
    <div className="member-coach-booking-details">
      <SectionContainer title="All Coaching Sessions">
        <div className="filter-options">
          <button onClick={() => setFilter("ALL")}>ALL</button>
          <button onClick={() => setFilter("TODAY")}>TODAY</button>
          <button onClick={() => setFilter("UPCOMING")}>UPCOMING</button>
          <button onClick={() => setFilter("COMPLETED")}>COMPLETED</button>
        </div>
        {filteredcoachSessions.length === 0 ? (
          <p>No trainning sessions available.</p>
        ) : (
          <Table headers={tableHeaders} body={tableBody} />
        )}
      </SectionContainer>
    </div>
  );
};

export default AdminCoachBookingDetails;
