import React, { useState, useEffect } from "react";
import "./MemberDashboardStyles.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import CoachCard from "../../../components/CoachCard/CoachCard";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import CourtCard from "../../../components/CourtCard/CourtCard";

const MemberDashboard = () => {
  const [featuredCoaches, setFeaturedCoaches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const coachesPerPage = 3;

  const [featuredCourts, setFeaturedCourts] = useState([]);
  const [currentCourtIndex, setCurrentCourtIndex] = useState(0);
  const courtsPerPage = 3;

  useEffect(() => {
    fetch("http://localhost:8080/api/users/get-all-coaches")
      .then((response) => response.json())
      .then((data) => setFeaturedCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  const nextCoach = () => {
    if (currentIndex + coachesPerPage < featuredCoaches.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCoach = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentCoaches = featuredCoaches.slice(
    currentIndex,
    currentIndex + coachesPerPage
  );

  useEffect(() => {
    fetch("http://localhost:8080/api/court-bookings/courts")
      .then((response) => response.json())
      .then((data) => setFeaturedCourts(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  const nextCourt = () => {
    if (currentCourtIndex + coachesPerPage < featuredCourts.length) {
      setCurrentCourtIndex(currentIndex + 1);
    }
  };

  const previousCourt = () => {
    if (currentCourtIndex != 0) {
      setCurrentCourtIndex(currentCourtIndex - 1);
    }
  };

  const currentCourts = featuredCourts.slice(
    currentCourtIndex,
    currentCourtIndex + courtsPerPage
  );

  return (
    <>
      <div className="member-dashboard-container">
        <div className="featured-coaches">
          <SectionContainer title="Featured Coaches">
            <div className="coach-list">
              {/* Previous Button */}
              <div
                onClick={previousCoach}
                className={`pagination-icon left-icon ${
                  currentIndex === 0 ? "disabled" : ""
                }`}
              >
                <GrFormPrevious size={30} cursor={"pointer"} color="white"  />
              </div>
              {currentCoaches.map((coach) => (
                <CoachCard key={coach.id} coach={coach} />
              ))}
              {/* Next Arrow Icon */}
              <div
                onClick={nextCoach}
                className={`pagination-icon right-icon ${
                  currentIndex + coachesPerPage >= featuredCoaches.length
                    ? "disabled"
                    : ""
                }`}
              >
                <GrFormNext size={30} cursor={"pointer"} color="white" />
              </div>
            </div>
          </SectionContainer>
        </div>

        <div className="featured-courts">
          <SectionContainer title="Featured Courts">
            <div className="coach-list">
              {/* Previous Button */}
              <div
                onClick={previousCourt}
                className={`pagination-icon left-icon ${
                  currentIndex === 0 ? "disabled" : ""
                }`}
              >
                <GrFormPrevious size={30} cursor={"pointer"} color="white" />
              </div>
              {currentCourts.map((court) => (
                <CourtCard key={court.courtId} court={court} />
              ))}
              {/* Next Arrow Icon */}
              <div
                onClick={nextCourt}
                className={`pagination-icon right-icon ${
                  currentCourtIndex + courtsPerPage >= featuredCourts.length
                    ? "disabled"
                    : ""
                }`}
              >
                <GrFormNext size={30} cursor={"pointer"} color="white"  />
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </>
  );
};

export default MemberDashboard;
