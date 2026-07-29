import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import iphoneImg from "../assets/iphone.jpeg";
import macbookImg from "../assets/macbook.png";
import ps6Img from "../assets/ps6.png";

const imageMap = {
  "iphone.jpeg": iphoneImg,
  "macbook.png": macbookImg,
  "ps6.png": ps6Img
};

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = sessionStorage.getItem("loggedInUserId");
      const token = sessionStorage.getItem("token");
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:8080/orders/buyer/${userId}`, {
          headers: {
            "Authorization": token ? `Bearer ${token}` : ""
          }
        });
        
        let dbOrders = [];
        if (response.ok) {
          dbOrders = await response.json();
        }

        const prodRes = await fetch("http://localhost:8080/products", {
          headers: {
            "Authorization": token ? `Bearer ${token}` : ""
          }
        });

        if (prodRes.ok) {
          const products = await prodRes.json();
          for (const p of products) {
            if (new Date(p.auctionEndTime) <= new Date()) {
              const bidRes = await fetch(`http://localhost:8080/bids/auction/${p.productId}/highest`, {
                headers: {
                  "Authorization": token ? `Bearer ${token}` : ""
                }
              });
              if (bidRes.ok) {
                const bidData = await bidRes.json();
                if (bidData && String(bidData.bidderId) === String(userId)) {
                  const orderExists = dbOrders.some(o => Number(o.productId) === Number(p.productId));
                  if (!orderExists) {
                    const createRes = await fetch("http://localhost:8080/orders", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": token ? `Bearer ${token}` : ""
                      },
                      body: JSON.stringify({
                        productId: p.productId,
                        buyerId: Number(userId),
                        sellerId: p.sellerId,
                        finalPrice: bidData.amount,
                        status: "PENDING"
                      })
                    });
                    if (createRes.ok) {
                      const newOrder = await createRes.json();
                      dbOrders.push(newOrder);
                    }
                  }
                }
              }
            }
          }
        }

        const mapped = await Promise.all(dbOrders.map(async (order) => {
          let productName = "Product";
          let image = "";
          
          try {
            const prodDetailRes = await fetch(`http://localhost:8080/products/${order.productId}`, {
              headers: {
                "Authorization": token ? `Bearer ${token}` : ""
              }
            });
            if (prodDetailRes.ok) {
              const prodData = await prodDetailRes.json();
              if (prodData) {
                productName = prodData.name;
                image = prodData.imageUrl;
              }
            }
          } catch (e) {
            console.error(e);
          }

          return {
            id: order.id,
            productName: productName,
            image: image,
            price: order.finalPrice,
            status: order.status,
            deliveryPerson: order.deliveryPersonId ? "Assigned" : "Not Assigned"
          };
        }));
        setOrders(mapped);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "bg-success-subtle text-success border border-success-subtle";
      case "OUT_FOR_DELIVERY":
        return "bg-warning-subtle text-warning border border-warning-subtle";
      case "ASSIGNED":
      default:
        return "bg-primary-subtle text-primary border border-primary-subtle";
    }
  };

  const getStatusText = (status) => {
    return status.replace(/_/g, " ");
  };

  return (
    <div className="main-content container py-4 text-start" style={{ maxWidth: "1000px" }}>
      {/* Page Title Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>My Orders</h1>
        <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
          Track and manage all your auction orders in one place.
        </p>
      </div>

      {/* Orders Table Container */}
      <div className="card border shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0 table-hover">
              <thead className="table-light">
                <tr className="border-bottom text-muted" style={{ fontSize: "0.85rem" }}>
                  <th className="px-4 py-3" style={{ width: "150px" }}>Order ID</th>
                  <th className="py-3" style={{ width: "350px" }}>Product</th>
                  <th className="py-3" style={{ width: "150px" }}>Final Amount</th>
                  <th className="py-3 text-center" style={{ width: "180px" }}>Status</th>
                  <th className="px-4 py-3" style={{ width: "170px" }}>Delivery Person</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No orders placed yet.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      {/* Order ID */}
                      <td className="px-4 py-3 fw-semibold text-secondary">{order.id}</td>

                      {/* Product details */}
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          {order.image ? (
                            <img
                              src={order.image.startsWith("data:") || order.image.startsWith("http") ? order.image : (imageMap[order.image] || order.image || iphoneImg)}
                              alt={order.productName}
                              className="rounded me-3 border bg-light"
                              style={{
                                width: "65px",
                                height: "65px",
                                objectFit: "cover"
                              }}
                            />
                          ) : (
                            <div 
                              className="rounded me-3 border bg-light d-flex align-items-center justify-content-center text-muted"
                              style={{ width: "65px", height: "65px", fontSize: "1.2rem" }}
                            >
                              📦
                            </div>
                          )}
                          <div>
                            <div className="fw-bold mb-0.5">{order.productName}</div>
                            <div className="text-secondary small" style={{ fontSize: "0.78rem", lineHeight: "1.2" }}>
                              {order.specifications}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 fw-bold text-success">
                        ₹{order.price.toLocaleString("en-IN")}
                      </td>

                      {/* Status badge */}
                      <td className="py-3 text-center">
                        <span className={`badge rounded-pill px-3 py-2 fw-bold ${getStatusBadgeClass(order.status)}`} style={{ fontSize: "0.78rem" }}>
                          {getStatusText(order.status)}
                        </span>
                      </td>

                      {/* Delivery Person */}
                      <td className="px-4 py-3 text-secondary fw-semibold">
                        {order.deliveryPerson}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back to Home Button at Bottom Center */}
      <div className="d-flex justify-content-center mt-4">
        <button
          onClick={() => navigate("/buyer/dashboard")}
          className="btn btn-outline-primary px-4 py-2 border-2 fw-semibold d-flex align-items-center gap-2"
          style={{ borderRadius: "6px" }}
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

export default MyOrders;
