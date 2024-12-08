import { useState, useContext, Profiler } from "react";
import axios from "axios";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { StoreContext } from "../../StoreContext/StoreContext";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import testUsers from "../../assets/tempData/testUsers";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {
        setIsLoggedIn,
        setUserId,
        setFirstName,
        setRole,
        setUsername,
        setLastName,
        setProfilePic,
    } = useContext(StoreContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/authenticate",
                {
                    email: email,
                    password: password,
                }
            );

            console.log("login-res", response);

            if (response.status === 200) {
                const role = response.data.role;
                const firstName = response.data.firstName;
                const lastName = response.data.lastName;
                const username = response.data.username;

                console.log("First Name:", firstName);
                console.log("Last Name:", lastName);
                console.log("Role:", role);
                console.log("username", username);
                
                setUserId(response.data.id);
                setFirstName(firstName);
                setLastName(lastName);
                setUsername(username);
                setRole(role);
                setProfilePic(response.data.profilePic);
                setIsLoggedIn(true);
                navigate("/dashboard");
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="toast-container-wrapper">
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
            </div>
            <div className="login-background">
                <div className="warp">
                    <form onSubmit={handleSubmit}>
                        <h1 className="heading">Login</h1>

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Username"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />

                            <FaUser className="icon" color="black" />
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                            <FaLock className="icon" color="black" />
                        </div>

                        <button type="submit" className="login">
                            Login
                        </button>

                        <div className="signup">
                            <p>
                                Don't have an Account? <br />
                                <br />{" "}
                                <a href="#">
                                    <Link className="btn btn-success" to={"/"}>
                                        Register
                                    </Link>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
