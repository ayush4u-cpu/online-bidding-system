import React from "react";
import iphone from "../assets/iphone.jpeg";
import Button from "./Button";
import bid from "../assets/bid.png";

function ProductCard() {
  return (
    <div
      className=" rounded-1 d-flex justify-content-center mx-2 card"
      style={{ width: "280px" }}
    >
      <div>
        <img
          src={iphone}
          alt=""
          srcset=""
          style={{
            width: "250px",
            height: "125px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div className="fw-ld text-center my-2">iPhone 17 Pro</div>
        <div
          className=" px-5"
          style={{
            color: "var(--text-secondary)",
            height: "60px",
            fontSize: "0.8rem",
          }}
        >
          iPhone 17 Pro. Exceptional, new Center Stage front camera.
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
              ₹70,000
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
              ₹85,250
            </div>
          </div>
        </div>
        <div className=" p-3">
          <Button
            color={"var(--blue-primary)"}
            logo={bid}
            hover={"blue"}
            text={"View & Bid"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
