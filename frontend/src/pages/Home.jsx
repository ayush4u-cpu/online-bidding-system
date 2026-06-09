import React from "react";
import Hero from "../sections/Hero";
import ActiveAuction from "../sections/ActiveAuction";

function Home() {
  return (
    <div>
      <div className="main-content">
        <Hero />
        <hr />
        <ActiveAuction />
      </div>
    </div>
  );
}

export default Home;
