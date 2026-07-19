import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerDashboard from "./pages/BuyerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDescription from "./pages/ProductDescription";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import MyWallet from "./pages/MyWallet";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SELLER"]}>
              <div className="container">
                <SellerDashboard />
              </div>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["BUYER"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery"
          element={
            <ProtectedRoute allowedRoles={["DELIVERY"]}>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer-wallet"
          element={
            <ProtectedRoute allowedRoles={["BUYER"]}>
              <MyWallet role="buyer" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller-wallet"
          element={
            <ProtectedRoute allowedRoles={["SELLER"]}>
              <MyWallet role="seller" />
            </ProtectedRoute>
          }
        />

        <Route path="/product/:id" element={<ProductDescription />} />
      </Routes>
    </Router>
  );
}

export default App;