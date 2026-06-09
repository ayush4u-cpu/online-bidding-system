import React from "react";
import ProductRow from "../components/ProductRow";
import AddProductForm from "../sections/AddProductForm";
import MyProducts from "../sections/MyProducts";
function SellerDashboard() {
  return (
    <div className="main-content">
      <div className="">
        <div className="py-4">
          <h1 className="fw-bold text-center">Seller Dashbaord</h1>
          <div
            style={{ color: "var(--text-secondary)" }}
            className="text-center"
          >
            Welcome, user
          </div>
        </div>
        <AddProductForm />
        <div className="mt-3">
          <MyProducts />
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
