import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import bidIcon from "../assets/bid.png";
import { createWebSocketClient } from "../utils/websocket";

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const userName = sessionStorage.getItem("loggedInUserName");
  const userRole = sessionStorage.getItem("loggedInUserRole");

  const loadProduct = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });
      if (response.ok) {
        const p = await response.json();
        
        let highestBid = p.currentHighestBid || p.basePrice;
        try {
          const bidRes = await fetch(`http://localhost:8080/bids/auction/${p.productId}/highest`, {
            headers: {
              "Authorization": token ? `Bearer ${token}` : ""
            }
          });
          if (bidRes.ok) {
            const bidData = await bidRes.json();
            if (bidData && bidData.amount) {
              highestBid = bidData.amount;
            }
          }
        } catch (e) {
          console.error("Error fetching highest bid:", e);
        }

        let sellerName = "";
        try {
          const sellerRes = await fetch(`http://localhost:8080/users/${p.sellerId}`, {
            headers: {
              "Authorization": token ? `Bearer ${token}` : ""
            }
          });
          if (sellerRes.ok) {
            const sellerData = await sellerRes.json();
            if (sellerData && sellerData.name) {
              sellerName = sellerData.name;
            }
          }
        } catch (e) {
          console.error("Error fetching seller details:", e);
        }

        setProduct({
          id: p.productId,
          name: p.name,
          description: p.description,
          image: p.imageUrl,
          imageSrc: p.imageUrl,
          basePrice: p.basePrice,
          currentBid: highestBid,
          endTime: p.auctionEndTime,
          startTime: p.auctionStartTime,
          status: p.status,
          sellerId: p.sellerId,
          seller: sellerName,
          category: "General", // Default/fallback category
          features: [] // Fallback features
        });
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProduct(null);
    }
  };

  useEffect(() => {
    loadProduct();

    const interval = setInterval(loadProduct, 5000);

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
      clearInterval(interval);
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

  const handleBidSubmit = async (e) => {
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

    if (product.startTime && new Date(product.startTime) > new Date()) {
      alert("Bidding has not started yet!");
      return;
    }

    const token = sessionStorage.getItem("token");
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");

    // Check wallet balance
    try {
      const walletRes = await fetch(`http://localhost:8080/wallets/user/${loggedInUserId}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });
      if (walletRes.ok) {
        const walletData = await walletRes.json();
        if (walletData.balance < numericBid) {
          alert(`Insufficient wallet balance! Your balance is ₹${walletData.balance.toLocaleString()}, but your bid amount is ₹${numericBid.toLocaleString()}. Please deposit funds first.`);
          return;
        }
      } else {
        alert("Unable to verify wallet balance. Please try again.");
        return;
      }
    } catch (err) {
      console.error("Wallet check error:", err);
      alert("Error connecting to server to check wallet balance.");
      return;
    }

    try {
      // 1. Get the previous highest bid first (before placing the new one)
      let prevBidderId = null;
      let prevAmount = 0;
      const prevBidRes = await fetch(`http://localhost:8080/bids/auction/${product.id}/highest`, {
        headers: { "Authorization": token ? `Bearer ${token}` : "" }
      });
      if (prevBidRes.ok) {
        const prevBidData = await prevBidRes.json();
        if (prevBidData && prevBidData.amount) {
          prevBidderId = prevBidData.bidderId;
          prevAmount = prevBidData.amount;
        }
      }

      // 2. Post the new bid
      const response = await fetch("http://localhost:8080/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          auctionId: product.id,
          bidderId: loggedInUserId,
          bidderName: userName,
          amount: numericBid
        })
      });

      if (response.ok) {
        // 3. New bid successfully placed! Now handle the wallet transactions:
        // A. Withdraw the new bid amount from current buyer
        await fetch(`http://localhost:8080/wallets/${loggedInUserId}/withdraw`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          },
          body: JSON.stringify({ amount: numericBid })
        });

        // B. Deposit the new bid amount to the seller
        if (product.sellerId) {
          await fetch(`http://localhost:8080/wallets/${product.sellerId}/deposit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify({ amount: numericBid })
          });
        }

        // C. If there was a previous bid, refund the old buyer and deduct from the seller
        if (prevBidderId && prevAmount > 0) {
          // Refund old buyer
          await fetch(`http://localhost:8080/wallets/${prevBidderId}/deposit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify({ amount: prevAmount })
          });

          // Deduct from seller
          if (product.sellerId) {
            await fetch(`http://localhost:8080/wallets/${product.sellerId}/withdraw`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : ""
              },
              body: JSON.stringify({ amount: prevAmount })
            });
          }
        }

        alert("Bid placed successfully! Wallet balances updated.");
        setBidAmount("");
        loadProduct();
      } else {
        const errorData = await response.json();
        alert(errorData.error || errorData.message || "Failed to place bid.");
      }
    } catch (error) {
      console.error("Bid error:", error);
      alert("Error connecting to server");
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
