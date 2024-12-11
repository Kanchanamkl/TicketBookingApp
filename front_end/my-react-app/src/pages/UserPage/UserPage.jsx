import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPageStyles.scss";
import Table from "../../components/Table/Table";
import Swal from "sweetalert2";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/users/get_users"
        );
        const nonAdminUsers = response.data.filter(user => user.role !== "ADMIN");
        setUsers(nonAdminUsers);
        setFilteredUsers(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    if (filter === "ALL") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === filter));
    }
  };

  const handleEditUser = (userId) => {
    
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = async (userId) => {
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
      // if (result.isConfirmed) {

      // }
    });
  };

  const tableHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Username",
    "Phone Number",
    "Role",
    "Actions",
  ];

  const tableBody = filteredUsers.map((user) => ({
    id: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    Username: user.username,
    phoneNumber: user.phoneNumber,
    role: user.role,
    actions: (
      <>
        <button onClick={() => handleShowUpdateForm(user.userId)}>Edit</button>
        <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
      </>
    ),
  }));

  const [updatingUser, setupdatingUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'CUSTOMER',
    password: ''
  });

  
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdatingUser({ ...updatingUser, [name]: value });
  };

  const handleShowUpdateForm = (userId) => {
    const userToEdit = users.find(user => user.userId === userId);
    setupdatingUser({
      userId: userToEdit.userId,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      username: userToEdit.username, 
      phoneNumber: userToEdit.phoneNumber,
      role: userToEdit.role,
      profilePic: userToEdit.profilePic,
      password: userToEdit.password
    });
    setCurrentUserId(userId);
    setShowUpdateForm(true);
  };

  const handleUpdateUser = async (user) => {
    try {
      await axios.put(`http://localhost:8080/api/users/update-user?id=${currentUserId}`, user);
      const updatedUsers = users.map((u) => {
        if (u.userId === currentUserId) {
          return user;
        }
        return u;
      });
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setShowUpdateForm(false);
      Swal.fire({
        title: "Success!",
        text: "User updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error!",
        text: "Error updating user.",
        icon: "error",
      });
    }
  }

  return (
    <div className="admin-users-container">
      <SectionContainer >
   
      <div className="filters">
        <button onClick={() => handleFilterChange("ALL")}>ALL</button>
        <button onClick={() => handleFilterChange("VENDOR")}>VENDORS</button>
        <button onClick={() => handleFilterChange("CUSTOMER")}>CUSTOMERS</button>
      </div>


      {showUpdateForm && (
        <div className="user-form-popup">
          <div className="user-form">
            <h2>Update User</h2>
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
               value={updatingUser.firstName}
              onChange={handleInputChange}
            />
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={updatingUser.lastName}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="username" 
              placeholder="Username" 
               value={updatingUser.username}
              onChange={handleInputChange}
            />
              <input 
              type="text" 
              name="phoneNumber" 
              placeholder="Phone Number" 
              value={updatingUser.phoneNumber}
              onChange={handleInputChange}
            />
            
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={updatingUser.password}
              onChange={handleInputChange}
            />
            <div className="form-buttons">
              <button onClick={()=>handleUpdateUser(updatingUser)}>Update</button>
              <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 ? (
        <p>No user available.</p>
      ) : (
        <Table headers={tableHeaders} body={tableBody} />
      )}
    </SectionContainer>
    </div>
  );
};

export default UserPage;
