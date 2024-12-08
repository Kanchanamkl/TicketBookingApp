import { useEffect, useState, useContext } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import BillingPopup_coach from "../../components/BillingPopups/BillingPopup_coach";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { StoreContext } from "../../StoreContext/StoreContext";
import timeSlots from "../../assets/timeSlots";
import "./BookingPagesStyles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingPage_coach = () => {
    const {
        selectedCoach,
        userId,
    } = useContext(StoreContext);
    const [query, setQuery] = useState("");
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setSelectedSlot(null);
    }, []);

    const formatTimeSlot = (slot) => {
        return `${slot.start.time} - ${slot.end.time}`;
    };

    const tags_ = timeSlots.map(formatTimeSlot);

    const filteredTags = tags_.filter(
        (item) =>
            item
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase().trim()) &&
            item !== selectedSlot
    );

    const getFirstDayOfCurrentMonth = () => {
        const now = new Date();
        return new Date();
    };

    const [selectedDate, setSelectedDate] = useState(
        getFirstDayOfCurrentMonth()
    );

    useEffect(() => {
        setSelectedSlot(null);
    }, [selectedDate]);

    const [showPopup, setShowPopup] = useState(false);
    const appointmentDetails = {
        date: selectedDate.toLocaleDateString(),
        coach: selectedCoach,
        selectedSlot: selectedSlot,
    };

    const handleCheckout = () => {
        if (!selectedSlot) {
            toast.error("Please select a time slot.");
            return;
        }
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handlePaymentCompletion = async (orderId) => {
        console.log("Payment completed. OrderID:" + orderId);
        console.log("Selected Slot:", selectedSlot);
        console.log("Selected Coach:", selectedCoach);
        if (orderId) {
            try {
                if (!selectedCoach) {
                    throw new Error("Selected coach is not defined");
                }
                if (!userId) {
                    throw new Error("User ID is not defined");
                }
                if (!selectedDate) {
                    throw new Error("Selected date is not defined");
                }
                if (!selectedSlot) {
                    throw new Error("Selected slot is not defined");
                }

                const [startTime, endTime] = selectedSlot.split(" - ");
                const response = await axios.post(
                    "http://localhost:8080/api/coach-bookings/create",
                    {
                        coachId: selectedCoach.id,
                        memberId: userId,
                        date: selectedDate.toISOString().split("T")[0],
                        startTime: startTime,
                        endTime: endTime,
                        description: "Training session",
                    }
                );

                console.log("Booking response:", response.data);
                setShowPopup(false);
                setTimeout(() => {
                    window.location.replace("/coach-bookings");
                }, 1000);
                setSelectedSlot(null);
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        }
    };

    window.payhere.onCompleted = function onCompleted(orderId) {
        handlePaymentCompletion(orderId);
    };
    window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
    };

    window.payhere.onError = function onError(error) {
        console.log("Error: " + error);
    };

    const location = useLocation();
    const { coach } = location.state || {};

    useEffect(() => {
        if (!selectedCoach) {
            navigate("/coach-bookings");
        }
    }, [selectedCoach, navigate]);

    return (
        <div className="book-container">
            <ToastContainer
                position="top-center"
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
            {selectedCoach && (
                <div className="booking-container">
                    <div className="booking-container-left">
                        <img
                            src={selectedCoach.profilePic}
                            alt={selectedCoach.name}
                            className="booking-img"
                        />
                    </div>
                    <div className="booking-container-right">
                        <h3 className="booking-name">
                            {selectedCoach.firstName} {selectedCoach.lastName}
                        </h3>
                        <p className="booking-specialize">
                            {selectedCoach.specialize}
                        </p>
                        <p className="booking-email">
                            Email: {selectedCoach.user.username}
                        </p>
                        <p className="booking-contact">
                            Mobile: {selectedCoach.phoneNumber}
                        </p>
                        <p className="booking-city">City: Colombo</p>
                    </div>
                </div>
            )}

            <div className="slot-selection">
                <div className="selector-section">
                    <DatePicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>
                <div className="availability-info">
                    <p>Available Time Slots On:</p>
                    <label>{selectedDate.toLocaleDateString()}</label>
                </div>

                {selectedSlot && (
                    <div className="selected-slots">
                        <div className="slot-label">Selected Slot :</div>

                        <div className="slot-chips">
                            <div className="slot-item">
                                {selectedSlot}
                                <div onMouseDown={(e) => e.preventDefault()}>
                                    <IoMdCloseCircle
                                        onClick={() => {
                                            setSelectedSlot(null);
                                        }}
                                        size="20px"
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <p>Pick Your Slot:</p>
                {menuOpen && (
                    <div className="slot-menu">
                        <ul>
                            {filteredTags.length ? (
                                filteredTags.map((tag, index) => (
                                    <li
                                        key={`${tag}-${index}`}
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {
                                            setMenuOpen(true);
                                            setSelectedSlot(tag);
                                            setQuery("");
                                        }}
                                    >
                                        {tag}
                                    </li>
                                ))
                            ) : (
                                <li>No Slots available</li>
                            )}
                        </ul>
                    </div>
                )}
                <div className="checkout-button">
                    <button onClick={handleCheckout}>
                        Proceed To Checkout
                    </button>
                    {showPopup && (
                        <BillingPopup_coach
                            appointmentDetails={appointmentDetails}
                            onClose={closePopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage_coach;