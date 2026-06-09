import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import ActiveAuction from "../sections/ActiveAuction";

function Home({ products, onSelectProduct, onNavigateHome, onNavigateDeliveries }) {
  return (
    <div>
      <Navbar 
        onNavigateHome={onNavigateHome} 
        onNavigateDeliveries={onNavigateDeliveries} 
        currentPage="home" 
      />
      <div className="main-content">
        <Hero />
        <hr />
        <ActiveAuction products={products} onSelectProduct={onSelectProduct} />
      </div>
    </div>
  );
}

export default Home;
