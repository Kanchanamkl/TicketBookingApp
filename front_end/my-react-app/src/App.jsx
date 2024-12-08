import "./App.scss";
import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CoachRegister from "./pages/Register/CoachRegister";
import PlayerRegister from "./pages/Register/PlayerRegister";

import MemberDashBoard from "./pages/DashBoard/MemberDashBoard/MemberDashboard";
import AdminDashBoard from "./pages/DashBoard/AdminDashBoard/AdminDashboard";
import CoachDashboard from "./pages/DashBoard/CoachDashBoard/CoachDashboard";
import { StoreContext } from "./StoreContext/StoreContext";
import SideBar from "./components/SideBar/SideBar";
import AboutPage from "./pages/AboutPage/AboutPage";
import Profile from "./pages/Profile/Profile";
import CourtBooking from "./pages/CourtsBooking/MemberCourtBooking/CourtBooking";
import AdminCourtBooking from "./pages/CourtBookingDetails/AdminCourtBookingDetails/AdminCourtBooking";
import UserPage from "./pages/UserPage/UserPage";
import CoachBooking from "./pages/CoachBooking/MemberCoachBooking/CoachBooking";
import BookingPage_coach from "./pages/BookingPages/BookingPage_coach";
import BookingPage_court from "./pages/BookingPages/BookingPage_court";
import MemberCoachBookingDetails from "./pages/CoachBookingDetails/MemberCoachBookingDetails/MemberCoachBookingDetails";
import MemberCourtBookingDetails from "./pages/CourtBookingDetails/MemberCourtBookingDetails/MemberCourtBookingDetails";
import PageNotFound from "./pages/PageNotFoundPage/PageNotFound";
import Footer from "./components/Footer/Footer";
import AdminCoachBookingDetails from "./pages/CoachBookingDetails/AdminCoachBookingDetails/AdminCoachBookingDetails";
import CoachCoachBookingDetails from "./pages/CoachBookingDetails/CoachCoachBookingDetails/CoachCoachBookingDetails";

function App() {
    const { isLoggedIn, role } = useContext(StoreContext);

    if (!isLoggedIn) {
        return (
            <>
                {/* <NavBar /> */}
                <Routes>
                    <Route path="/" element={<HeroPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/coachregister" element={<CoachRegister />} />
                    <Route
                        path="/playerregister"
                        element={<PlayerRegister />}
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </>
        );
    } else {
        switch (role) {
            case "ADMIN":
                return (
                    <>
                        <SideBar />
                        <Routes>
                            <Route path="/" element={<AdminDashBoard />} />
                            <Route
                                path="/dashboard"
                                element={<AdminDashBoard />}
                            />
                            <Route
                                path="/admin-court-booking"
                                element={<AdminCourtBooking />}
                            />
                            <Route
                                path="/admin-coach-bookings"
                                element={<AdminCoachBookingDetails/>}
                            />
                            <Route path="/users" element={<UserPage />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                        <Footer />
                    </>
                );
            case "COACH":
                return (
                    <>
                        <SideBar />
                        <Routes>
                            <Route path="/" element={<CoachDashboard />} />
                            <Route
                                path="/dashboard"
                                element={<CoachDashboard />}
                            />
                            <Route
                                path="/sessions"
                                element={<CoachCoachBookingDetails />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                        <Footer />
                    </>
                );
            case "MEMBER":
                return (
                    <>
                        <SideBar />
                        <Routes>
                            <Route path="/" element={<MemberDashBoard />} />
                            <Route
                                path="/dashboard"
                                element={<MemberDashBoard />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/court-bookings"
                                element={<CourtBooking />}
                            />
                            <Route
                                path="/coach-bookings"
                                element={<CoachBooking />}
                            />
                            <Route
                                path="/book-coach"
                                element={<BookingPage_coach/>}
                            />
                            <Route
                                path="/book-court"
                                element={<BookingPage_court />}
                            />
                            <Route
                                path="/member-coach-booking-details"
                                element={<MemberCoachBookingDetails />}
                            />
                            <Route
                                path="/member-court-booking-details"
                                element={<MemberCourtBookingDetails />}
                            />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>

                        <Footer />
                    </>
                );
            default:
                return (
                    <>
                        {/* <NavBar /> */}
                        <Routes>
                            <Route path="/" element={<HeroPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/coachregister"
                                element={<CoachRegister />}
                            />
                            <Route
                                path="/playerregister"
                                element={<PlayerRegister />}
                            />
                            <Route path="/about" element={<AboutPage />} />
                        </Routes>
                        <Footer />
                    </>
                );
        }
    }
}

export default App;
