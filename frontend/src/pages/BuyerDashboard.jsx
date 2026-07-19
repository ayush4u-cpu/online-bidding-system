import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { getAuctions } from "../utils/db";
import "../styles/BuyerDashboard.css";

import share from "../assets/share.png";

function BuyerDashboard() {
  const [auctions, setAuctions] = useState([]);
  const userName = sessionStorage.getItem("loggedInUserName") || "Buyer";

  const loadAuctions = () => {
    const allAuctions = getAuctions();
    // Filter to show only active auctions
    const activeAuctions = allAuctions.filter((a) => a.status === "ACTIVE");
    setAuctions(activeAuctions);
  };

  useEffect(() => {
    loadAuctions();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Buyer Dashboard</h1>
            <br />

            <p className="welcome-text">Welcome, {userName}</p>

            <p className="user-subtext">
              Browse active auctions and place your bids.
            </p>
          </div>

          <div style={{ width: "150px" }}>
            <Button
              color={"var(--green-primary)"}
              logo={share}
              hover={"green"}
              text={"My Orders"}
            />
          </div>
        </div>

        {/* Active Auctions */}
        <div className="section-header">
          <h2>Active Auctions</h2>
        </div>

        {/* Product Cards */}
        <div className="auctions-grid">
          {auctions.map((auction) => (
            <ProductCard 
              key={auction.id} 
              product={auction} 
              onBidPlaced={loadAuctions} 
            />
          ))}
          {auctions.length === 0 && (
            <div className="text-muted py-5 text-center w-100 grid-span-4" style={{ gridColumn: "1 / -1" }}>
              No active auctions available right now.
            </div>
          )}
        </div>
        <div className="view-all-container">
          <div style={{ width: "210px" }}>
            <Button
              color={"var(--blue-primary)"}
              logo={share}
              hover={"blue"}
              text={"View All Auctions"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerDashboard;
