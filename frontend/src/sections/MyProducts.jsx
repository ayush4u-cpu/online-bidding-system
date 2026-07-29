import React, { useState, useEffect } from "react";
import ProductRow from "../components/ProductRow";

function MyProducts({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const loggedInUserId = Number(sessionStorage.getItem("loggedInUserId"));

  const fetchSellerProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:8080/products", {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });
      if (response.ok) {
        const data = await response.json();
        const mapped = await Promise.all(data.map(async (p) => {
          let highestBid = p.currentHighestBid || p.basePrice;
          let winnerName = null;
          let winnerId = null;
          try {
            const bidRes = await fetch(`http://localhost:8080/bids/auction/${p.productId}/highest`, {
              headers: {
                "Authorization": token ? `Bearer ${token}` : ""
              }
            });
            if (bidRes.ok) {
              const bidData = await bidRes.json();
              if (bidData && bidData.amount) {
                highestBid = bidData.amount;
                winnerName = bidData.bidderName;
                winnerId = bidData.bidderId;
              }
            }
          } catch (e) {
            console.error(e);
          }

          // Fetch order details if exists to get delivery status and delivery person name
          let deliveryPersonName = null;
          let deliveryStatus = null;
          let orderId = null;
          try {
            const orderRes = await fetch(`http://localhost:8080/orders`, {
              headers: {
                "Authorization": token ? `Bearer ${token}` : ""
              }
            });
            if (orderRes.ok) {
              const ordersData = await orderRes.json();
              const matchedOrder = ordersData.find(o => Number(o.productId) === Number(p.productId));
              if (matchedOrder) {
                deliveryPersonName = matchedOrder.deliveryPersonName;
                deliveryStatus = matchedOrder.status || matchedOrder.deliveryStatus;
                orderId = matchedOrder.id;
              }
            }
          } catch (e) {
            console.error(e);
          }

          return {
            id: p.productId,
            name: p.name,
            description: p.description,
            image: p.imageUrl,
            basePrice: p.basePrice,
            currentBid: highestBid,
            endTime: p.auctionEndTime,
            status: p.status,
            sellerId: p.sellerId,
            winnerName: winnerName,
            winnerId: winnerId,
            deliveryPersonName: deliveryPersonName,
            deliveryStatus: deliveryStatus,
            orderId: orderId
          };
        }));
        const filtered = mapped.filter(p => Number(p.sellerId) === loggedInUserId);
        console.log("MyProducts Debug:", { loggedInUserId, fetchedCount: mapped.length, filteredCount: filtered.length, mapped });
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
    const interval = setInterval(fetchSellerProducts, 5000);
    return () => clearInterval(interval);
  }, [refreshTrigger, loggedInUserId]);

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:8080/users/delivery", {
          headers: {
            "Authorization": token ? `Bearer ${token}` : ""
          }
        });
        if (response.ok) {
          const data = await response.json();
          setDeliveryPartners(data);
        }
      } catch (error) {
        console.error("Error fetching delivery partners:", error);
      }
    };
    fetchDeliveryPartners();
  }, []);

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
                  "Delivery Partner"
                ].map((e, index) => (
                  <th key={index}>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  deliveryPartners={deliveryPartners}
                  onAssignSuccess={fetchSellerProducts}
                />
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
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
