import "./App.scss";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VenderRegister from "./pages/Register/VendorRegister";
import CustomerRegister from "./pages/Register/CustomerRegister";



import VenderDashboard from "./pages/DashBoard/VenderDashBoard/VenderDashboard";
import { StoreContext } from "./StoreContext/StoreContext";
import SideBar from "./components/SideBar/SideBar";
import PageNotFound from "./pages/PageNotFoundPage/PageNotFound";
import Footer from "./components/Footer/Footer";
import EventPage from "./pages/EventPage/EventPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  const { isLoggedIn, role } = useContext(StoreContext);

  if (!isLoggedIn) {
    return (
      <>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/venderregister" element={<VenderRegister />} />
          <Route path="/customerregister" element={<CustomerRegister />} />
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
              <Route path="/" element={<UserPage />} />
  
              <Route path="/users" element={<UserPage />} />
              <Route path="*" element={<UserPage />} />
            </Routes>
            <Footer />
          </>
        );
      case "VENDOR":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<EventPage />} />
              <Route path="/dashboard" element={<VenderDashboard />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="*" element={<EventPage />} />
            </Routes>
            <Footer />
          </>
        );
      case "CUSTOMER":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<EventPage />} />
              <Route path="/events" element={<EventPage/>} />
              <Route path="*" element={<EventPage />} />
            </Routes>

            <Footer />
          </>
        );
      default:
        return (
          <>
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/venderregister" element={<VenderRegister />} />
              <Route path="/customerregister" element={<CustomerRegister />} />
            </Routes>
            <Footer />
          </>
        );
    }
  }
}

export default App;
