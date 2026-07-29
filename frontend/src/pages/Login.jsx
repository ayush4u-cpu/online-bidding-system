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

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken;
        sessionStorage.setItem("token", token);

        // Decode token to get userId and role
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;
        const role = payload.role;

        // Fetch additional user details to get the user's name
        const userResponse = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          sessionStorage.setItem("loggedInUserName", userData.name);
          sessionStorage.setItem("loggedInUserRole", role);
          sessionStorage.setItem("loggedInUserId", userId);

          if (role === "ADMIN") {
            navigate("/admin/dashboard");
          } else if (role === "SELLER") {
            navigate("/seller/dashboard");
          } else if (role === "BUYER") {
            navigate("/buyer/dashboard");
          } else {
            navigate("/delivery");
          }
        } else {
          alert("Failed to fetch user details");
        }
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server");
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
