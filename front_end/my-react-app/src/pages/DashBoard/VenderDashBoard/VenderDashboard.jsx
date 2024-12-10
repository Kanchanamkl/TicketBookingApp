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
            axios.get(`http://localhost:8081/api/ticketing/sold_ticket_count`)
                .then((response) => {
                    const soldCount = response.data;
                    console.log("Sold ticket count:", soldCount);
                    const currentTime = new Date();
                    const currentMinute = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

                    setRevenueData((prevData) => {
                        const updatedData = { ...prevData };
                        const lastLabel = updatedData.labels[updatedData.labels.length - 1];

                        if (lastLabel === currentMinute) {
                            // Update the last data point
                            updatedData.datasets[0].data[updatedData.datasets[0].data.length - 1] += soldCount;
                        } else {
                            // Add a new data point
                            updatedData.labels.push(currentMinute);
                            updatedData.datasets[0].data.push(soldCount);
                        }

                        // Filter data to only include entries from the past hour
                        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
                        updatedData.labels = updatedData.labels.filter((time, index) => {
                            const [hours, minutes] = time.split(":").map(Number);
                            const timeDate = new Date(currentTime);
                            timeDate.setHours(hours, minutes, 0, 0);
                            return timeDate >= oneHourAgo;
                        });
                        updatedData.datasets[0].data = updatedData.datasets[0].data.slice(-updatedData.labels.length);

                        return updatedData;
                    });
                })
                .catch((error) => console.error("Error fetching sold ticket count data:", error));
        }, 2000);

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