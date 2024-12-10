import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../config/firebaseConfig"; // 

function VendorRegister() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        rePassword: "",
        address: "",
        email: "",
        dob: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match");
            return;
        }


        try {

            const requestBody = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.email,
                password: formData.password,
                role: "VENDOR",
                phoneNumber: "0760570695", 
                address: formData.address,
                gender: "Male", 
                dob: formData.dob,
            };

            const response = await fetch(
                "http://localhost:8081/api/users/create-user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                toast.success("Registration Successful");
                setTimeout(function () {
                    window.location.replace("/");
                }, 1300);
            } else {
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Registration failed");
        }finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="form-background">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className="form-warp">
                {loading ? (
                        <div className="loading-screen">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                        <h1 className="form-heading">Vendor Registration</h1>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-input-box">
                            <input
                                className="form-input"
                                type="password"
                                name="rePassword"
                                placeholder="Re-enter Password"
                                value={formData.rePassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="file-input-box">
 
                        </div>
                        <div className="reg-button">
                            <button type="submit" className="register">
                                Register
                            </button>
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => navigate("/")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    )}

                </div>
            </div>
        </div>
    );
}

export default VendorRegister;
