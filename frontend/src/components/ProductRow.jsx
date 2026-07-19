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
          {product.status === "ACTIVE" ? <ActiveStatus /> : <SoldStatus />}
        </div>
      </td>
      <td style={{ color: "var(--text-secondary)" }}>
        <div className="py-3">{formatDate(product.endTime)}</div>
      </td>
    </tr>
  );
}

export default ProductRow;
