import React, { useState, useEffect, useContext } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";
import "./CoachDashboardStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import { StoreContext } from "../../../StoreContext/StoreContext";

// Register necessary Chart.js components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const CoachDashboard = () => {
    const revenueData = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Revenue",
                data: [1200, 1500, 1100, 1800, 1700, 1600, 1900, 2000, 2100, 2200, 2300, 2400],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const trainingSessionsData = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Training Sessions",
                data: [5, 4, 6, 5, 7, 8, 6, 7, 5, 6, 4, 5],
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                tension: 0.4, // Smooth curve
            },
        ],
    };


    return (
        <div className="coach-dashboard-container">
            <SectionContainer title="Coach Dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <section className="dashboard-section">
                            <h2>Training Sessions</h2>
                            <Line data={trainingSessionsData} />
                        </section>
                        <section className="dashboard-section">
                            <h2>Monthly Income</h2>
                            <Bar data={revenueData} />
                        </section>
                        {/* <section className="dashboard-section">
                            <h2>Performance Analysis</h2>
                            <Pie data={performanceAnalysisData} />
                        </section> */}
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default CoachDashboard;
