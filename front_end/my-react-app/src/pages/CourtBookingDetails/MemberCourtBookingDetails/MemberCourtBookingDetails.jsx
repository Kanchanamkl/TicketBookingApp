import "./MemberCourtBookingDetailsStyles.scss";
import React, { useState, useEffect, useContext } from "react";
import CoachBookingCard from "../../../components/BookingCard/CoachBookingCard/CoachBookingCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import axios from "axios";
import { StoreContext } from "../../../StoreContext/StoreContext";
import CourtBooking from "../../CourtsBooking/MemberCourtBooking/CourtBooking";
import CourtBookingCard from "../../../components/BookingCard/CourtBookingCard/CourtBookingCard";

const MemberCourtBookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const { userId } = useContext(StoreContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/court-bookings/get_court_bookings_by_member/${userId}`
      )
      .then((response) => {
        setBookings(response.data);
        console.log("Booking Data :", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const isToday = (date) => {
    const today = new Date();
    const bookingDate = new Date(date);
    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  };

  const todaySessions = bookings.filter((booking) => isToday(booking.date));

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

  const filteredBookings = bookings.filter((booking) => {
    const status = getStatus(booking.date);
    if (filter === "ALL") return true;
    return status === filter;
  });

  const tableHeaders = [
    "Booking ID",
    "Court Id",
    "Court Name",
    "Date",
    "Time",
    "Status",
  ];
  const tableBody = filteredBookings.map((booking) => ({
    id: `CB00${booking.id}`,
    court_id: booking.court.courtId,
    court_name: booking.court.courtName,
    date: new Date(booking.date).toLocaleDateString(),
    time: `${booking.startTime} - ${booking.endTime}`,
    status: getStatus(booking.date),
  }));

  return (
    <div className="member-court-booking-details">
      <SectionContainer title="Today's Court Bookings">
        <div className="today-sesstions">
          {todaySessions.length === 0 ? (
            <div className="no-data-notice">No traning sessions for today.</div>
          ) : (
            todaySessions.map((booking) => (
              <CourtBookingCard key={booking.id} court_booking={booking} />
            ))
          )}
        </div>
      </SectionContainer>
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
  );
};

export default MemberCourtBookingDetails;
