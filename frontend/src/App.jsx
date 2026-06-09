import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProductDescription from "./pages/ProductDescription";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import MyWallet from "./pages/MyWallet";
import { initialProducts, initialDeliveries, initialWallets } from "./data/products";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [deliveries] = useState(initialDeliveries);
  const [wallets, setWallets] = useState(initialWallets);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  const handlePlaceBid = (id, amount) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, currentBid: amount } : p));
  };

  const handleAddMoney = (role, amount) => {
    setWallets(prev => ({
      ...prev,
      [role]: {
        balance: prev[role].balance + amount,
        transactions: [{ type: "Deposit", amount, date: "Just now" }, ...prev[role].transactions]
      }
    }));
  };

  // Simple routing mapping
  if (path === "/delivery") {
    return (
      <DeliveryDashboard 
        deliveries={deliveries} 
        onNavigateHome={() => navigate("/")} 
      />
    );
  }
  
  if (path === "/buyer-wallet" || path === "/seller-wallet") {
    const role = path === "/buyer-wallet" ? "buyer" : "seller";
    return (
      <MyWallet 
        role={role} 
        wallet={wallets[role]} 
        onAddMoney={handleAddMoney} 
        onNavigateHome={() => navigate("/")} 
      />
    );
  }
  
  if (path.startsWith("/product/")) {
    const pId = path.substring(9);
    const prod = products.find(p => p.id === pId);
    if (prod) {
      return (
        <ProductDescription 
          product={prod} 
          onPlaceBid={handlePlaceBid} 
          onNavigateHome={() => navigate("/")} 
        />
      );
    }
  }

  return (
    <Home 
      products={products} 
      onSelectProduct={(id) => navigate(`/product/${id}`)} 
      onNavigateHome={() => navigate("/")} 
    />
  );
}

export default App;
