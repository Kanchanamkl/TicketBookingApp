import React, { useState, useEffect, useContext } from "react";
import CoachBookingCard from "../../../components/BookingCard/CoachBookingCard/CoachBookingCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import axios from "axios";
import { StoreContext } from "../../../StoreContext/StoreContext";
import "./AdminCourtBookingStyles.scss";

const AdminCourtBooking = () => {

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");



  useEffect(() => {
    axios.get("http://localhost:8080/api/court-bookings/get_all_court_bookings")
      .then(response => {
        setBookings(response.data);
        setFilteredBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
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
  
  const filteredCourtSessions = bookings.filter((booking) => {
    const status = getStatus(booking.date);
    if (filter === "ALL") return true;
    return status === filter;
  });

  const tableHeaders = ["Court Name", "Date", "Start Time", "End Time", "Status"];
  const tableBody = filteredCourtSessions.map((booking) => ({
    id: booking.id,
    court: booking.court.courtName ,
    // member: `${booking.member.firstName} ${booking.member.lastName}`,
    date: new Date(booking.date).toLocaleDateString(),
    time: `${booking.startTime} - ${booking.endTime}`,
    status: getStatus(booking.date),
  }));


  return (
    <>
      <div className="admin-court-booking-container">
        <SectionContainer title="All Court Bookings">
        <div className="filter-options">
          <button onClick={() => setFilter("ALL")}>ALL</button>
          <button onClick={() => setFilter("TODAY")}>TODAY</button>
          <button onClick={() => setFilter("UPCOMING")}>UPCOMING</button>
          <button onClick={() => setFilter("COMPLETED")}>COMPLETED</button>
        </div>
          {filteredBookings.length === 0 ? (
            <p>No court bookings available.</p>
          ) : (
            <Table headers={tableHeaders} body={tableBody} />
          )}
        </SectionContainer>
      </div>
    </>
  );
};

export default AdminCourtBooking;
