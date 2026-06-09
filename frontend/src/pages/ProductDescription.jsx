import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import bidIcon from "../assets/bid.png";

function ProductDescription({ product, onPlaceBid, onNavigateHome }) {
  const [bidAmount, setBidAmount] = useState("");

  if (!product) {
    return (
      <div>
        <Navbar onNavigateHome={onNavigateHome} />
        <div className="main-content container text-center py-5">
          <h3>Product not found</h3>
          <button className="btn btn-primary mt-3" onClick={onNavigateHome}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const numericBid = parseFloat(bidAmount);
    if (!isNaN(numericBid) && numericBid > product.currentBid) {
      onPlaceBid(product.id, numericBid);
      setBidAmount("");
      alert("Bid placed successfully!");
    } else {
      alert("Please enter a bid amount higher than the current bid.");
    }
  };

  return (
    <div>
      <Navbar onNavigateHome={onNavigateHome} />
      
      <div className="main-content container py-4 text-start">
        <button onClick={onNavigateHome} className="btn btn-link mb-3 p-0 text-decoration-none">
          &larr; Back to Dashboard
        </button>

        <div className="row g-4">
          <div className="col-md-6">
            <img src={product.imageSrc} alt={product.title} className="img-fluid rounded border p-2 bg-light" />
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{product.title}</h1>
            <p className="text-muted">{product.description}</p>
            <hr />
            
            <div className="d-flex justify-content-between bg-light p-3 rounded mb-3 border">
              <div>
                <span className="text-secondary small d-block">Base Price</span>
                <span className="fw-bold text-success fs-5">₹{product.basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div>
                <span className="text-secondary small d-block">Current Bid</span>
                <span className="fw-bold text-primary fs-5">₹{product.currentBid.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <form onSubmit={handleBidSubmit} className="border p-3 rounded bg-white">
              <div className="mb-3">
                <label className="form-label small text-secondary">Place Your Bid (INR)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder={`Higher than ₹${product.currentBid.toLocaleString("en-IN")}`}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              </div>
              <Button
                color={"var(--blue-primary)"}
                logo={bidIcon}
                hover={"blue"}
                text={"Place Bid"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
