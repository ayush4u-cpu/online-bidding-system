import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import login from "../assets/login.png";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@mail.com" && password === "admin123") {
      sessionStorage.setItem("loggedInUserName", "Admin");
      sessionStorage.setItem("loggedInUserRole", "ADMIN");
      navigate("/admin/dashboard");
      return;
    }

    // Check localStorage users database
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(u => u.email === email && u.password === password);

    if (matchedUser) {
      sessionStorage.setItem("loggedInUserName", matchedUser.name);
      sessionStorage.setItem("loggedInUserRole", matchedUser.role);
      if (matchedUser.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (matchedUser.role === "SELLER") {
        navigate("/seller/dashboard");
      } else if (matchedUser.role === "BUYER") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/delivery");
      }
      return;
    }

    const storedUser = JSON.parse(sessionStorage.getItem("registeredUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      sessionStorage.setItem("loggedInUserName", storedUser.name);
      sessionStorage.setItem("loggedInUserRole", storedUser.role);
      if (storedUser.role === "SELLER") {
        navigate("/seller/dashboard");
      } else if (storedUser.role === "BUYER") {
        navigate("/buyer/dashboard");
      } else {
        navigate("/delivery");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1>Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div onClick={handleLogin}>
            <Button
              color={"var(--blue-primary)"}
              logo={login}
              hover={"blue"}
              text={"Login"}
            />
          </div>

          <hr />

          <p>
            New user? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
