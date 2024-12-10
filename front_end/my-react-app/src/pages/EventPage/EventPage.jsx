import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./EventPageStyles.scss";
import { StoreContext } from "../../StoreContext/StoreContext";

const EventPage = () => {
  const { role } = useContext(StoreContext);
  const userRole = role;

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    totalTickets: "",
    location: "",
  });
  const [producingTickets, setProducingTickets] = useState({});

  useEffect(() => {
    // Fetch events from the database
    axios
      .get("http://localhost:8081/api/ticketing/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = () => {
    axios
      .post("http://localhost:8081/api/ticketing/create_event", newEvent)
      .then((response) => {
        setEvents([...events, response.data]);
        setNewEvent({
          eventName: "",
          eventDate: "",
          eventTime: "",
          totalTickets: "",
          location: "",
        });
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  const handlePurchaseTicket = (eventId) => {
    // Handle ticket purchase logic here
    console.log(`Purchasing ticket for event ID: ${eventId}`);
  };

  const handleStartProduceTickets = (eventId) => {
   alert(`Start producing tickets for event ID: ${eventId}`);
    console.log(`Start producing tickets for event ID: ${eventId}`);
  };

  const handleStopProduceTickets = (eventId) => {
    alert(`Stop producing tickets for event ID: ${eventId}`);
    console.log(`Stop producing tickets for event ID: ${eventId}`);
  };

  const validateFields = () => {
    const { eventName, eventDate, totalTickets, location } = newEvent;
    if (!eventName || !eventDate || !totalTickets || !location) {
      alert("All fields are required.");
      return false;
    }
    if (isNaN(totalTickets) || totalTickets <= 0) {
      alert("Total tickets must be a positive number.");
      return false;
    }
    return true;
  };

  return (
    <div className="event-page">
      <h1>Events</h1>
      {userRole === "VENDOR" && (
        <div className="create-event">
          <h2>Create New Event</h2>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={newEvent.eventName}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="eventDate"
            value={newEvent.eventDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="totalTickets"
            placeholder="Ticket Count"
            value={newEvent.totalTickets}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleInputChange}
          />
          <button
            onClick={() => {
              if (validateFields()) {
                handleCreateEvent();
              }
            }}
          >
            Create Event
          </button>
        </div>
      )}
      <div className="event-list">
        {events.map((event) => (
          <div key={event.eventId} className="event-card">
            <h3>Event : {event.eventName}</h3>
            <p>Date : {event.eventDate} </p>
            {/* <p>Time : {event.eventTime}</p> */}
            <p>City : {event.location}</p>
            <p>Tickets Available: {event.totalTickets}</p>
            {userRole === "CUSTOMER" && (
              <button onClick={() => handlePurchaseTicket(event.eventId)}>
                Purchase Ticket
              </button>
            )}

            {userRole === "VENDOR" && (
              <div className="vendor-actions">
                <button
                  onClick={() => handleStartProduceTickets(event.eventId)}
           
                >
                  Start Produce Tickets
                </button>
                <button
                  onClick={() => handleStopProduceTickets(event.eventId)}
                  
                >
                  Stop Produce Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;