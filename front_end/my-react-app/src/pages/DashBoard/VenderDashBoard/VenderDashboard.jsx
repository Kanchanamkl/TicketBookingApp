import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./VenderDashboardStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import { StoreContext } from "../../../StoreContext/StoreContext";
import axios from "axios";

// Register necessary Chart.js components
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const VendorDashboard = () => {
    const { userId } = useContext(StoreContext);
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: [
            {
                label: "Sold Tickets",
                data: [],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    });

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://localhost:8081/api/ticketing/sold_ticket_count?vendorId=${userId}`)
                .then((response) => {
                    const soldCount = response.data;
                    console.log("Sold ticket count:", soldCount);
                    const currentTime = new Date().toLocaleTimeString();
                    setRevenueData((prevData) => {
                        const updatedData = { ...prevData };
                        updatedData.labels = [...updatedData.labels, currentTime];
                        updatedData.datasets[0].data = [...updatedData.datasets[0].data, soldCount];
                        console.log("Updated data:", updatedData);
                        return updatedData;
                    });
                })
                .catch((error) => console.error("Error fetching sold ticket count data:", error));
        }, 60000);

        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div className="vendor-dashboard-container">
            <SectionContainer title="Vendor Dashboard">
                <div className="dashboard-container">
                    <div className="dashboard-content">
                        <section className="dashboard-section">
                            <h2>Ticket Selling</h2>
                            <Bar data={revenueData} />
                        </section>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default VendorDashboard;