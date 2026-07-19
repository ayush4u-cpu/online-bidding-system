import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const name = sessionStorage.getItem("loggedInUserName");
    const role = sessionStorage.getItem("loggedInUserRole");
    if (name && role) {
      setUser({ name, role });
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUserName");
    sessionStorage.removeItem("loggedInUserRole");
    setUser(null);
    navigate("/");
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    if (user.role === "SELLER") return "/seller/dashboard";
    if (user.role === "DELIVERY") return "/delivery";
    return "/buyer/dashboard";
  };

  return (
    <div className="bg-black text-white py-3 px-4 d-flex justify-content-between fixed-top align-items-center">
      <Link to="/" className="text-white text-decoration-none fw-bold fs-5">
        Online Bidding
      </Link>
      <div>
        {user ? (
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
              Welcome, <strong className="text-white">{user.name}</strong> ({user.role})
            </span>
            
            {/* Conditional Wallet link for Buyer and Seller */}
            {(user.role === "BUYER" || user.role === "SELLER") && (
              <button
                onClick={() => navigate(user.role === "BUYER" ? "/buyer-wallet" : "/seller-wallet")}
                style={{ backgroundColor: "#6f42c1" }}
                className="text-white rounded-1 border-0 px-3 py-1.5"
              >
                My Wallet
              </button>
            )}

            {/* Conditional Delivery Dashboard link */}
            {user.role === "DELIVERY" && (
              <button
                onClick={() => navigate("/delivery")}
                style={{ backgroundColor: "var(--green-primary)" }}
                className="text-white rounded-1 border-0 px-3 py-1.5"
              >
                Deliveries
              </button>
            )}

            <button
              onClick={() => navigate(getDashboardPath())}
              style={{ backgroundColor: "var(--blue-primary)" }}
              className="text-white rounded-1 border-0 px-3 py-1.5 btn-hover-blue"
            >
              Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              style={{ backgroundColor: "#dc3545" }}
              className="text-white rounded-1 border-0 px-3 py-1.5"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "var(--blue-primary)",
              }}
              className="text-white rounded-1 border-0 px-3 py-1.5 mx-1 btn-hover-blue"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{ backgroundColor: "var(--green-primary)" }}
              className="text-white rounded-1 border-0 px-3 py-1.5 mx-1 btn-hover-green"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
