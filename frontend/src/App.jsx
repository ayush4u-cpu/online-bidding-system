import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SellerDashboard from "./pages/SellerDashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/seller/dashboard"
          element={
            <div className="container">
              <SellerDashboard />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
