import React from "react";
import { useNavigate } from "react-router-dom";
import iphone from "../assets/iphone.jpeg";
import Button from "./Button";
import bid from "../assets/bid.png";
import { placeBid } from "../utils/db";

const fallbackProduct = {
  id: 1,
  name: "iPhone 17 Pro",
  category: "Electronics",
  basePrice: 70000,
  currentBid: 85250,
  description: "iPhone 17 Pro. Exceptional, new Center Stage front camera.",
  image: "",
  endTime: "2026-08-30T22:00",
  status: "ACTIVE"
};

function ProductCard({ product = fallbackProduct, onBidPlaced }) {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("loggedInUserName");
  const userRole = sessionStorage.getItem("loggedInUserRole");

  const handleBidClick = () => {
    if (!userName) {
      alert("You must be logged in to place a bid.");
      navigate("/login");
      return;
    }

    if (userRole !== "BUYER") {
      alert("Only buyers are allowed to place bids.");
      return;
    }

    const newBidAmount = window.prompt(
      `Enter your bid amount for ${product.name} (Current Bid: ₹${product.currentBid}):`
    );

    if (newBidAmount === null) return; // User cancelled

    const res = placeBid(product.id, newBidAmount, userName);
    if (res.success) {
      alert(`Bid placed successfully! New bid: ₹${res.auction.currentBid}`);
      if (onBidPlaced) {
        onBidPlaced();
      }
    } else {
      alert(res.message || "Failed to place bid.");
    }
  };

  return (
    <div className="auction-card mx-2 my-2" style={{ width: "290px" }}>
      <img
        src={product.image || iphone}
        alt={product.name}
        className="auction-image"
        style={{ height: "160px", objectFit: "cover" }}
      />
      <div className="card-content">
        <h3 className="fs-5 fw-bold text-center text-truncate">{product.name}</h3>
        <p className="description text-muted text-center" style={{ fontSize: "0.85rem", height: "60px", overflow: "hidden" }}>
          {product.description}
        </p>
        <hr />
        <div className="price-row">
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }} className="fw-bold">
              Base Price
            </div>
            <div className="base-price">₹{product.basePrice.toLocaleString()}</div>
          </div>
          <div className="text-end">
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }} className="fw-bold">
              Current Bid
            </div>
            <div className="current-bid">₹{product.currentBid.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-3">
          <Button
            color={"var(--blue-primary)"}
            logo={bid}
            hover={"blue"}
            text={"View & Bid"}
            onClick={handleBidClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;