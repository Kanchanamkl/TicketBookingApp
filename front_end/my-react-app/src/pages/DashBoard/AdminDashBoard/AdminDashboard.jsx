import "./AdminDashboardStyles.scss";
import React, {useEffect , useState} from "react";
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
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
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

const AdminDashBoard = () => {
    const barData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Number of Users",
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.6)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: [20, 25, 32, 40, 60, 61],
            },
        ],
    };

    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Revenue",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [20, 25, 32, 40, 60, 63],
            },
        ],
    };

    const pieData = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const [memberCount, setMemberCount] =useState(0);
    const [coachCount, setCoachCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/users/get_users')
            .then(response => response.json())
            .then(data => {
                const members = data.filter(user => user.role === 'MEMBER').length;
                const coaches = data.filter(user => user.role === 'COACH').length;
                setMemberCount(members);
                setCoachCount(coaches);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <div className="admin-dashboard-container">
            <SectionContainer title="Admin Dashboard">
                <div className="card-container">
                    <div className="card">
                        <h2>Total Members</h2>
                        <h2>{memberCount}</h2>
                    </div>
                    <div className="card">
                        <h2>Total Coaches</h2>
                        <h2>{coachCount}</h2>
                    </div>
                    <div className="card">
                        <h2>Total Courts</h2>
                        <h2>6</h2>
                    </div>
                </div>
                <div className="dashboard-container">
                    <div className="charts">
                        <div className="chart">
                            <h3>Users Over Time</h3>
                            <Bar data={barData} />
                        </div>
                        <div className="chart">
                            <h3>Revenue Over Time</h3>
                            <Line data={lineData} />
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default AdminDashBoard;
