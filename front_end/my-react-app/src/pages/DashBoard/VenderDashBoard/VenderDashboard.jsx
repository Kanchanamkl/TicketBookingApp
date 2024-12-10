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
import "./VenderDashboardStyles.scss";
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

const vendorDashboard = () => {
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

    return (
        <div className="vendor-dashboard-container">
            <SectionContainer title="Vendor Dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <section className="dashboard-section">
                            <h2>Ticket Selling </h2>
                            <Bar data={revenueData} />
                        </section>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default vendorDashboard;
