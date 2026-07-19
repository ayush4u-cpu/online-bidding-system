import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDeliveries } from "../utils/db";

function DeliveryDashboard() {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    setDeliveries(getDeliveries());
  }, []);

  return (
    <div className="main-content container py-4 text-start" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ fontSize: "2rem" }}>Delivery Dashboard</h1>
          <p className="text-muted mb-0">Track won auctions shipment progress.</p>
        </div>
        <button onClick={() => navigate("/")} className="btn btn-outline-primary">&larr; Auctions</button>
      </div>

      {/* Deliveries Table Card */}
      <div className="card border shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr className="border-bottom text-muted" style={{ fontSize: "0.85rem" }}>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="py-3">Product Name</th>
                  <th className="py-3">Winner</th>
                  <th className="py-3">Final Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">No deliveries found.</td>
                  </tr>
                ) : (
                  deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td className="px-4 py-3 fw-bold text-secondary">{delivery.id}</td>
                      <td className="py-3 fw-semibold">{delivery.productName}</td>
                      <td className="py-3">{delivery.winner}</td>
                      <td className="py-3 fw-bold text-success">₹{delivery.price.toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3">
                        <span className={`badge rounded-pill px-3 py-1.5 ${
                          delivery.status.toLowerCase() === "delivered" ? "bg-success" : 
                          delivery.status.toLowerCase() === "out for delivery" ? "bg-primary" : "bg-warning text-dark"
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;
