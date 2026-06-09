import React from "react";
import ProductRow from "../components/ProductRow";

function MyProducts() {
  return (
    <div className="card p-4">
      <h4 className=" px-2">My Products</h4>
      <div className="container mt-1">
        <div className="d-flex justify-content-start mt-3">
          <table className="table">
            <thead>
              {[
                "Name",
                "Base Price",
                "Current Bid",
                "Status",
                "Auction End",
                "",
              ].map((e) => (
                <th>{e}</th>
              ))}
            </thead>
            <tbody>
              <ProductRow />
              <ProductRow />
              <ProductRow />
              <ProductRow />
              <ProductRow />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
