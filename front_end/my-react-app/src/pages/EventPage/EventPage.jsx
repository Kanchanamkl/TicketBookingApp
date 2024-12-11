import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./EventPageStyles.scss";
import { StoreContext } from "../../StoreContext/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPage = () => {
  const { role, userId } = useContext(StoreContext);
  const userRole = role;

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    totalTickets: "",
    location: "",
    ticketReleaseRate: "",
  });
  const [producingTickets, setProducingTickets] = useState({});

  useEffect(() => {
    // Fetch events from the database
    axios
      .get("http://localhost:8081/api/ticketing/events")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error("Error: Expected an array of events");
        }
      })
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
        if (response.status === 200) {
          axios
          .get("http://localhost:8081/api/ticketing/events")
          .then((response) => {
            if (Array.isArray(response.data)) {
              setEvents(response.data);
            } else {
              console.error("Error: Expected an array of events");
            }
          })
          .catch((error) => console.error("Error fetching events:", error));
        setNewEvent({
          eventName: "",
          eventDate: "",
          eventTime: "",
          totalTickets: "",
          location: "",
          ticketReleaseRate:""
        });
        }
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  const handlePurchaseTicket = (eventId , ticketCount) => {
  if (!window.confirm("Are you sure you want to purchase these tickets?")) {
    return;
  }
  axios
    .post(`http://localhost:8081/api/ticketing/customer/buy?customerId=${userId}&eventId=${eventId}&ticketCount=${ticketCount}`)
    .then((response) => {
      console.log("Ticket purchased successfully:", response.data);
      setTimeout(() => {
        axios
          .get("http://localhost:8081/api/ticketing/events")
          .then((response) => {
            if (Array.isArray(response.data)) {
              setEvents(response.data);
            } else {
              console.error("Error: Expected an array of events");
            }
          })
          .catch((error) => console.error("Error fetching events:", error));
      }, 2000);
      setProducingTickets((prevState) => ({
        ...prevState,
        [eventId]: "",
      }));
    })
    .catch((error) => console.error("Error purchasing ticket:", error));
  console.log(`Purchasing ticket for event ID: ${eventId}`);
  };

  const handleStartProduceTickets = (eventId) => {
    if (!window.confirm("Are you sure you want to start producing tickets for this event?")) {
      return;
    }
    setProducingTickets((prevState) => ({
      ...prevState,
      [eventId]: true,
    }));
    axios
      .post(`http://localhost:8081/api/ticketing/start_produce_tickets?vendorId=${userId}&eventId=${eventId}&ticketCount=${100}`)
      .then((response) => {
        if(response.status === 200){
          toast.success("Started producing tickets", { autoClose: 2000 });
          console.log("Started producing tickets:", response.data);
          checkTicketPoolStatus(eventId);
        }
      })
      .catch((error) => console.error("Error starting ticket production:", error));
  };

  const checkTicketPoolStatus = (eventId) => {
    const intervalId = setInterval(() => {
      axios
        .get("http://localhost:8081/api/ticketing/check_ticketpool_status")
        .then((response) => {
          if (response.status === 201) {
            toast.error("Max pool count exceeded", { autoClose: 2000 });
            clearInterval(intervalId);
            handleStopProduceTickets(eventId);
          }
        })
        .catch((error) => console.error("Error checking ticket pool status:", error));
    }, 1000);
  };

  const handleStopProduceTickets = (eventId) => {
    setProducingTickets((prevState) => ({
      ...prevState,
      [eventId]: false,
    }));
    axios
      .post(`http://localhost:8081/api/ticketing/stop_produce_tickets?vendorId=${userId}&eventId=${eventId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Stopped producing tickets:", response.data);
          axios
            .get("http://localhost:8081/api/ticketing/events")
            .then((response) => {
              if (Array.isArray(response.data)) {
                setEvents(response.data);
              } else {
                console.error("Error: Expected an array of events");
              }
            })
            .catch((error) => console.error("Error fetching events:", error));
        }
      })
      .catch((error) => console.error("Error stopping ticket production:", error));
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
                      <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
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
            placeholder="Max Ticket Count"
            value={newEvent.totalTickets}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="ticketReleaseRate"
            placeholder="Ticket Release Rate (ms)"
            value={newEvent.ticketReleaseRate}
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
            <p>City : {event.location}</p>
            <p>Tickets Available: {event.totalTickets}</p>

            {userRole === "CUSTOMER" && (
              <div>
                <input
                  type="number"
                  placeholder="Number of Tickets"
                  value={producingTickets[event.eventId] || ""}
                  onChange={(e) =>
                    setProducingTickets((prevState) => ({
                      ...prevState,
                      [event.eventId]: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={() => {
                    const ticketCount = parseInt(producingTickets[event.eventId], 10);
                    if (ticketCount > 0 && ticketCount <= event.totalTickets) {
                      handlePurchaseTicket(event.eventId , ticketCount);
                    } else {
                      alert("Selected ticket count exceeds the available tickets. Please select lesser ticket count");
                    }
                  }}
                >
                  Purchase Ticket
                </button>
              </div>
            )}

            {userRole === "VENDOR" && (
              <><p>Ticket Release Rate: {event.ticketReleaseRate} ms</p>
              <div className="vendor-actions">
                <button
                  onClick={() => handleStartProduceTickets(event.eventId)}
                  disabled={producingTickets[event.eventId]}
                >
                  Start Produce Tickets
                </button>
                <button
                  onClick={() => handleStopProduceTickets(event.eventId)}
                  disabled={!producingTickets[event.eventId]}
                >
                  Stop Produce Tickets
                </button>
              </div></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;