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

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, role })
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const errorText = await response.text();
        let errorMessage = "Registration failed";
        try {
          const errJson = JSON.parse(errorText);
          if (errJson.errors && Array.isArray(errJson.errors)) {
            errorMessage = errJson.errors.map(err => err.defaultMessage || JSON.stringify(err)).join(", ");
          } else {
            errorMessage = errJson.message || errJson.error || JSON.stringify(errJson) || errorMessage;
          }
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error connecting to server: " + error.message);
    }
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

          <div className="my-3" onClick={handleRegister}>
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
