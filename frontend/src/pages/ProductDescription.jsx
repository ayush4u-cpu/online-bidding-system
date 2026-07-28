import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bidIcon from "../assets/bid.png";
import { getAuctions, placeBid } from "../utils/db";
import { createWebSocketClient } from "../utils/websocket";

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const userName = sessionStorage.getItem("loggedInUserName");
  const userRole = sessionStorage.getItem("loggedInUserRole");

  const loadProduct = () => {
    const allAuctions = getAuctions();
    const found = allAuctions.find((a) => String(a.id) === String(id));
    setProduct(found || null);
  };

  useEffect(() => {
    loadProduct();

    const disconnect = createWebSocketClient((bidUpdate) => {
      // Receive bid updates in real time and update only the currentBid state
      setProduct((prevProduct) => {
        if (!prevProduct || String(prevProduct.id) !== String(bidUpdate.auctionId)) {
          return prevProduct;
        }
        return {
          ...prevProduct,
          currentBid: Number(bidUpdate.amount)
        };
      });
    }, id);

    return () => {
      disconnect();
    };
  }, [id]);

  if (!product) {
    return (
      <div className="main-content container text-center py-5">
        <h3>Product not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();

    if (!userName) {
      alert("You must be logged in to place a bid.");
      navigate("/login");
      return;
    }

    if (userRole !== "BUYER") {
      alert("Only buyers are allowed to place bids.");
      return;
    }

    const numericBid = parseFloat(bidAmount);
    if (isNaN(numericBid)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    const res = placeBid(product.id, numericBid, userName);
    if (res.success) {
      alert(`Bid placed successfully! New bid: ₹${res.auction.currentBid.toLocaleString("en-IN")}`);
      setBidAmount("");
      loadProduct(); // reload to get new currentBid
    } else {
      alert(res.message || "Failed to place bid.");
    }
  };

  return (
    <div className="main-content container py-4 text-start">
      <button onClick={() => navigate(-1)} className="btn btn-link mb-3 p-0 text-decoration-none">
        &larr; Back
      </button>

      <div className="row g-4">
        <div className="col-md-6 text-center bg-light p-3 rounded border d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
          <img 
            src={product.imageSrc} 
            alt={product.name || product.title} 
            className="img-fluid rounded shadow-sm" 
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{product.name || product.title}</h1>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="badge bg-secondary">{product.category}</div>
            {product.seller && (
              <span className="text-muted small">
                Seller: <strong>{product.seller}</strong>
              </span>
            )}
          </div>
          <p className="text-muted leading-relaxed">{product.description}</p>
          
          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-bold fs-6">Key Specifications:</h5>
              <ul className="ps-3 small text-secondary">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <hr />
          
          <div className="d-flex justify-content-between bg-light p-3 rounded mb-3 border">
            <div>
              <span className="text-secondary small d-block">Base Price</span>
              <span className="fw-bold text-success fs-5">₹{product.basePrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="text-end">
              <span className="text-secondary small d-block">Current Bid</span>
              <span className="fw-bold text-primary fs-5">₹{product.currentBid.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <form onSubmit={handleBidSubmit} className="border p-3 rounded bg-white shadow-sm">
            <div className="mb-3">
              <label className="form-label small text-secondary fw-semibold">Place Your Bid (INR)</label>
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
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
