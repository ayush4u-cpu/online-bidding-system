import React from "react";
import ProductCard from "../components/ProductCard";
import ButtonOutlined from "../components/ButtonOutlined";
import share from "../assets/share.png";

function ActiveAuction() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div style={{ width: "200px" }}>
          <h4 className="d-flex justify-content-center">Active Auctions</h4>
          <div className="d-flex justify-content-center my-3">
            <div
              style={{
                borderBottom: "2px solid",
                borderColor: "var(--blue-primary)",
              }}
              className=" w-75"
            ></div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {[1, 2, 3, 4, 5].map((i) => {
          return <ProductCard />;
        })}
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex my-3">
          <ButtonOutlined
            color={"var(--blue-primary)"}
            logo={share}
            text={"View All Auctions"}
          />
        </div>
      </div>
    </div>
  );
}

export default ActiveAuction;
