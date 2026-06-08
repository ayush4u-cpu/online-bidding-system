import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import ActiveAuction from "../sections/ActiveAuction";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Hero />
        <hr />
        <ActiveAuction />
      </div>
    </div>
  );
}

export default Home;
