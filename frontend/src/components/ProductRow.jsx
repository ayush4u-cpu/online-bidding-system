import React from "react";
import iphone from "../assets/iphone.jpeg";
import ActiveStatus from "./ActiveStatus";
import SoldStatus from "./SoldStatus";
import ButtonOutlined from "../components/ButtonOutlined";
function ProductRow() {
  return (
    <tr>
      <td className="d-flex align-items-center">
        <img
          src={iphone}
          alt=""
          className="rounded mx-1"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
        <div className="mx-1 d-flex align-items-center">
          <div>
            <div className=" fw-bold">iPhone 17 Pro</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
              Smartphone
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">₹70,000</div>
      </td>
      <td className="fw-bold" style={{ color: "var(--blue-primary)" }}>
        ₹85,250
      </td>
      <td>
        <ActiveStatus />
      </td>
      <td style={{ color: "var(--text-secondary)" }}>28 May, 2025, 10:00 PM</td>
      <td className="d-flex justify-content-center align-items-center">
        {/* <div className="d-flex">
          <ButtonOutlined
            color={"var(--blue-primary)"}
            logo={""}
            text={"View Details"}
          />
        </div> */}
      </td>
    </tr>
  );
}

export default ProductRow;
