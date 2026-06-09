import React from "react";
import Button from "./Button";
import bid from "../assets/bid.png";

function ProductCard({ product, onSelect }) {
  if (!product) return null;

  return (
    <div
      className=" rounded-1 d-flex justify-content-center mx-2 card"
      style={{ width: "280px" }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "15px" }}>
          <img
            src={product.imageSrc}
            alt={product.title}
            style={{
              width: "250px",
              height: "150px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "4px",
            }}
          />
        </div>
        <div className="fw-bold text-center my-2">{product.title}</div>
        <div
          className=" px-3 text-center"
          style={{
            color: "var(--text-secondary)",
            height: "60px",
            fontSize: "0.8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical"
          }}
        >
          {product.description}
        </div>
        <div className=" px-3">
          <hr />
        </div>
        <div className="d-flex justify-content-between px-4">
          <div className="">
            <div
              style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              className="fw-bold"
            >
              Base Price
            </div>
            <div
              style={{ color: "var(--green-primary)" }}
              className="text-center fw-bold"
            >
              ₹{product.basePrice.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="">
            <div
              style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              className="fw-bold"
            >
              Current Bid
            </div>
            <div
              style={{ color: "var(--blue-primary)" }}
              className="text-center fw-bold"
            >
              ₹{product.currentBid.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
        <div className=" p-3">
          <Button
            color={"var(--blue-primary)"}
            logo={bid}
            hover={"blue"}
            text={"View & Bid"}
            onClick={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
