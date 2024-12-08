import { useEffect, useState, useContext } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import BillingPopup_court from "../../components/BillingPopups/BillingPopup_court";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { StoreContext } from "../../StoreContext/StoreContext";
import timeSlots from "../../assets/timeSlots";
import "./BookingPagesStyles.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingPage_court = () => {
    const { selectedCourt, userId } = useContext(StoreContext);
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
        court: selectedCourt,
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
        console.log("Selected Court:", selectedCourt);
        if (orderId) {
            try {
                if (!selectedCourt || !selectedCourt.courtId) {
                    throw new Error("Selected court is not defined");
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
                    "http://localhost:8080/api/court-bookings/create",
                    {
                        courtId: selectedCourt.courtId,
                        memberId: userId,
                        date: selectedDate.toISOString().split("T")[0],
                        startTime: startTime,
                        endTime: endTime,
                        description: "Tennis practice session",
                    }
                );

                console.log("Booking response:", response.data);
                setShowPopup(false);
                setTimeout(() => {
                    window.location.replace("/court-bookings");
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
    const { court } = location.state || {};

    useEffect(() => {
        if (!selectedCourt) {
            navigate("/court-bookings");
        }
    }, [selectedCourt, navigate]);

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
            {selectedCourt && (
                <div className="booking-container">
                    <div className="booking-container-left">
                        <img
                            src={selectedCourt.courtImg}
                            alt={selectedCourt.courtName}
                            className="booking-img"
                        />
                    </div>
                    <div className="booking-container-right">
                        <h3 className="booking-name">
                            {selectedCourt.courtName}
                        </h3>
                        <p className="booking-specialize">
                            Court Id: {selectedCourt.courtId}
                        </p>
                        <p className="booking-specialize">
                            Court Type: {selectedCourt.courtType}
                        </p>
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
                        <BillingPopup_court
                            appointmentDetails={appointmentDetails}
                            onClose={closePopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage_court;