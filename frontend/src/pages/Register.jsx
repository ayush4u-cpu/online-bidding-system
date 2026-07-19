import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import register from "../assets/register.png";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("BUYER");

  const handleRegister = () => {
    const registeredUser = {
      name,
      email,
      password,
      role,
    };

    console.log(registeredUser);

    sessionStorage.setItem("registeredUser", JSON.stringify(registeredUser));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <h1>Register</h1>

          <p className="register-subtitle">
            Create a new account to get started
          </p>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Role</label>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>BUYER</option>
            <option>SELLER</option>
            <option>DELIVERY</option>
          </select>

          <div onClick={handleRegister}>
            <Button
              color={"var(--green-primary)"}
              logo={register}
              hover={"green"}
              text={"Register"}
            />
          </div>

          <p className="login-link">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
