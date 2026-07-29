import React from "react";
import iphone from "../assets/iphone.jpeg";
import ActiveStatus from "./ActiveStatus";
import SoldStatus from "./SoldStatus";

const fallbackProduct = {
  name: "iPhone 17 Pro",
  category: "Electronics",
  basePrice: 70000,
  currentBid: 85250,
  status: "ACTIVE",
  endTime: "2026-08-30T22:00"
};

function ProductRow({ product = fallbackProduct }) {
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  const isEnded = new Date(product.endTime) <= new Date();
  const hasBids = product.currentBid > product.basePrice;

  const renderStatus = () => {
    if (product.status === "SOLD") {
      return <SoldStatus />;
    }
    if (product.status === "NOT_SOLD") {
      return (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            width: "max-content",
          }}
          className="rounded text-center fw-bold px-3 py-1"
        >
          NOT SOLD
        </div>
      );
    }
    if (product.status === "ACTIVE") {
      if (isEnded) {
        if (hasBids) {
          return <SoldStatus />;
        } else {
          return (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                width: "max-content",
              }}
              className="rounded text-center fw-bold px-3 py-1"
            >
              NOT SOLD
            </div>
          );
        }
      }
      return <ActiveStatus />;
    }
    return <ActiveStatus />;
  };

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={product.image || iphone}
            alt={product.name}
            className="rounded mx-2"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover"
            }}
          />
          <div>
            <div className="fw-bold">{product.name}</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              {product.category}
            </div>
            {isEnded && hasBids && product.winnerName && (
              <div className="badge bg-success-subtle text-success border border-success-subtle mt-1" style={{ fontSize: "0.75rem" }}>
                Winner: {product.winnerName}
              </div>
            )}
          </div>
        </div>
      </td>
      <td>
        <div className="py-3">₹{product.basePrice.toLocaleString()}</div>
      </td>
      <td className="fw-bold py-3 text-primary">
        ₹{product.currentBid.toLocaleString()}
      </td>
      <td>
        <div className="py-2">
          {renderStatus()}
        </div>
      </td>
      <td style={{ color: "var(--text-secondary)" }}>
        <div className="py-3">{formatDate(product.endTime)}</div>
      </td>
    </tr>
  );
}

export default ProductRow;
