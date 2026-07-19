import React, { useState, useEffect } from "react";
import ProductRow from "../components/ProductRow";
import { getAuctions } from "../utils/db";

function MyProducts({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const sellerName = sessionStorage.getItem("loggedInUserName") || "Seller";

  useEffect(() => {
    const allAuctions = getAuctions();
    // Filter to show only this seller's products
    const sellerProducts = allAuctions.filter(
      (product) => product.seller === sellerName
    );
    setProducts(sellerProducts);
  }, [refreshTrigger, sellerName]);

  return (
    <div className="card p-4">
      <h4 className="px-2">My Products</h4>
      <div className="container mt-1">
        <div className="table-responsive mt-3">
          <table className="table align-middle">
            <thead>
              <tr>
                {[
                  "Name",
                  "Base Price",
                  "Current Bid",
                  "Status",
                  "Auction End",
                ].map((e, index) => (
                  <th key={index}>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No products added for auction yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
