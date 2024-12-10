import "./AdminDashboardStyles.scss";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Swal from "sweetalert2";
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
  const [users, setUsers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/users/get_users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        const customers = data.filter((user) => user.role === "CUSTOMER").length;
        const vendors = data.filter((user) => user.role === "VENDOR").length;
        setCustomerCount(customers);
        setVendorCount(vendors);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleDeleteUser = (userId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `http://localhost:8081/api/users/delete-user?id=${userId}`
            );
            setUsers(users.filter((user) => user.userId !== userId));
            setFilteredUsers(
              filteredUsers.filter((user) => user.userId !== userId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            console.log("User deleted:", userId);
          } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire({
              title: "Error!",
              text: "Error deleting user.",
              icon: "error",
            });
          }
        }
    
      });
  };

  const confirmDeleteUser = () => {
    fetch(`http://localhost:8081/api/users/delete-user?id=${selectedUser}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => user.id !== selectedUser));
          setShowPopup(false);
          setSelectedUser(null);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const cancelDeleteUser = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  return (
    <div className="admin-dashboard-container">
      <SectionContainer title="Admin Dashboard">
        <div className="card-container">
          <div className="card">
            <h2>Customers: {customerCount}</h2>
          </div>
          <div className="card">
            <h2>Vendors: {vendorCount}</h2>
          </div>
        </div>
        <div className="user-table">
          <h2>All Users</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.firstName} {user.lastName} </td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Are you sure you want to delete this user?</h3>
            <button onClick={confirmDeleteUser}>Yes</button>
            <button onClick={cancelDeleteUser}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;