import React, { useState, useEffect } from "react";
import { 
  getCategories, addCategory, deleteCategory, updateCategory, 
  getAuctions, deleteAuction, updateAuction,
  getUsers, deleteUser, updateUser,
  getBids, deleteBid, updateBid 
} from "../utils/db";
import Button from "../components/Button";

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [bids, setBids] = useState([]);
  
  // Navigation State
  const [activeView, setActiveView] = useState("categories");

  // Category Edit State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // User Edit State
  const [editingUser, setEditingUser] = useState(null);
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uRole, setURole] = useState("BUYER");

  // Product Edit State
  const [editingProduct, setEditingProduct] = useState(null);
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pBasePrice, setPBasePrice] = useState("");
  const [pCurrentBid, setPCurrentBid] = useState("");
  const [pEndTime, setPEndTime] = useState("");

  // Bid Edit State
  const [editingBid, setEditingBid] = useState(null);
  const [bBidderName, setBBidderName] = useState("");
  const [bBidAmount, setBBidAmount] = useState("");

  // Load dynamic data from DB
  const loadData = () => {
    setCategories(getCategories());
    setUsers(getUsers());
    setAuctions(getAuctions());
    setBids(getBids());
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------- CATEGORY CRUD ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both Category Name and Description.");
      return;
    }

    if (editingId) {
      updateCategory(editingId, { name, description });
      alert("Category updated successfully!");
      setEditingId(null);
    } else {
      addCategory({ name, description });
      alert("Category added successfully!");
    }

    setName("");
    setDescription("");
    loadData();
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
      loadData();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  // ---------------- USER CRUD ----------------
  const handleEditUserClick = (usr) => {
    setEditingUser(usr);
    setUName(usr.name);
    setUEmail(usr.email);
    setURole(usr.role);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();
    if (!uName.trim() || !uEmail.trim()) {
      alert("Name and Email cannot be empty.");
      return;
    }
    updateUser(editingUser.id, { name: uName, email: uEmail, role: uRole });
    alert("User updated successfully!");
    setEditingUser(null);
    loadData();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      loadData();
      if (editingUser && editingUser.id === id) {
        setEditingUser(null);
      }
    }
  };

  const handleCancelUserEdit = () => {
    setEditingUser(null);
    setUName("");
    setUEmail("");
    setURole("BUYER");
  };

  // ---------------- PRODUCT CRUD ----------------
  const handleEditProductClick = (prod) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPCategory(prod.category);
    setPBasePrice(prod.basePrice);
    setPCurrentBid(prod.currentBid);
    setPEndTime(prod.endTime);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!pName.trim()) {
      alert("Product name cannot be empty.");
      return;
    }
    updateAuction(editingProduct.id, {
      name: pName,
      category: pCategory,
      basePrice: Number(pBasePrice),
      currentBid: Number(pCurrentBid),
      endTime: pEndTime
    });
    alert("Product updated successfully!");
    setEditingProduct(null);
    loadData();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteAuction(id);
      loadData();
      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
      }
    }
  };

  const handleCancelProductEdit = () => {
    setEditingProduct(null);
    setPName("");
    setPCategory("");
    setPBasePrice("");
    setPCurrentBid("");
    setPEndTime("");
  };

  // ---------------- BID CRUD ----------------
  const handleEditBidClick = (bid) => {
    setEditingBid(bid);
    setBBidderName(bid.bidderName);
    setBBidAmount(bid.bidAmount);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleUpdateBidSubmit = (e) => {
    e.preventDefault();
    if (!bBidderName.trim() || !String(bBidAmount).trim()) {
      alert("Bidder Name and Bid Amount cannot be empty.");
      return;
    }
    updateBid(editingBid.id, {
      bidderName: bBidderName,
      bidAmount: Number(bBidAmount)
    });
    alert("Bid updated successfully!");
    setEditingBid(null);
    loadData();
  };

  const handleDeleteBid = (id) => {
    if (window.confirm("Are you sure you want to delete this bid?")) {
      deleteBid(id);
      loadData();
      if (editingBid && editingBid.id === id) {
        setEditingBid(null);
      }
    }
  };

  const handleCancelBidEdit = () => {
    setEditingBid(null);
    setBBidderName("");
    setBBidAmount("");
  };

  return (
    <div className="main-content container py-4 text-start" style={{ maxWidth: "1200px" }}>
      {/* Title Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-1" style={{ fontSize: "2.2rem" }}>Admin Dashboard</h1>
        <p className="text-muted mb-0">Welcome back, Admin! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-4 mb-4">
        {/* Card 1: Users */}
        <div 
          className="col-12 col-sm-6 col-lg-3" 
          onClick={() => setActiveView("users")}
          style={{ cursor: "pointer" }}
        >
          <div 
            className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3"
            style={{
              borderColor: activeView === "users" ? "var(--blue-primary)" : "#dee2e6",
              borderWidth: activeView === "users" ? "2px" : "1px",
              backgroundColor: activeView === "users" ? "#f8f9fa" : "#ffffff",
              transform: activeView === "users" ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s ease-in-out"
            }}
          >
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#e8f0fe", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              👤
            </div>
            <div>
              <span className="text-muted small fw-semibold text-start d-block">Users</span>
              <h2 className="fw-bold mb-0 text-primary" style={{ fontSize: "2rem" }}>{users.length}</h2>
            </div>
          </div>
        </div>

        {/* Card 2: Products */}
        <div 
          className="col-12 col-sm-6 col-lg-3" 
          onClick={() => setActiveView("products")}
          style={{ cursor: "pointer" }}
        >
          <div 
            className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3"
            style={{
              borderColor: activeView === "products" ? "var(--green-primary)" : "#dee2e6",
              borderWidth: activeView === "products" ? "2px" : "1px",
              backgroundColor: activeView === "products" ? "#f8f9fa" : "#ffffff",
              transform: activeView === "products" ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s ease-in-out"
            }}
          >
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#e6f4ea", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              📦
            </div>
            <div>
              <span className="text-muted small fw-semibold text-start d-block">Products</span>
              <h2 className="fw-bold mb-0 text-success" style={{ fontSize: "2rem" }}>{auctions.length}</h2>
            </div>
          </div>
        </div>

        {/* Card 3: Bids */}
        <div 
          className="col-12 col-sm-6 col-lg-3" 
          onClick={() => setActiveView("bids")}
          style={{ cursor: "pointer" }}
        >
          <div 
            className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3"
            style={{
              borderColor: activeView === "bids" ? "#8a3ffc" : "#dee2e6",
              borderWidth: activeView === "bids" ? "2px" : "1px",
              backgroundColor: activeView === "bids" ? "#f8f9fa" : "#ffffff",
              transform: activeView === "bids" ? "scale(1.02)" : "scale(1)",
              transition: "all 0.2s ease-in-out"
            }}
          >
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#f3e8fd", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              🔨
            </div>
            <div>
              <span className="text-muted small fw-semibold text-start d-block">Bids</span>
              <h2 className="fw-bold mb-0" style={{ color: "#8a3ffc", fontSize: "2rem" }}>{bids.length}</h2>
            </div>
          </div>
        </div>

        {/* Card 4: Revenue */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3">
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#fef3d6", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              ₹
            </div>
            <div>
              <span className="text-muted small fw-semibold text-start d-block">Revenue</span>
              <h2 className="fw-bold mb-0" style={{ color: "#d97706", fontSize: "2rem" }}>₹4,82,000</h2>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="mb-4">
        <ul className="nav nav-pills border-bottom pb-3 gap-2">
          <li className="nav-item">
            <button 
              className={`nav-link px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${activeView === "categories" ? "active bg-black text-white" : "text-dark bg-light border"}`}
              onClick={() => setActiveView("categories")}
              style={{ borderRadius: "8px" }}
            >
              📁 Categories
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${activeView === "users" ? "active bg-black text-white" : "text-dark bg-light border"}`}
              onClick={() => setActiveView("users")}
              style={{ borderRadius: "8px" }}
            >
              👤 Users
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${activeView === "products" ? "active bg-black text-white" : "text-dark bg-light border"}`}
              onClick={() => setActiveView("products")}
              style={{ borderRadius: "8px" }}
            >
              📦 Products
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${activeView === "bids" ? "active bg-black text-white" : "text-dark bg-light border"}`}
              onClick={() => setActiveView("bids")}
              style={{ borderRadius: "8px" }}
            >
              🔨 Bids
            </button>
          </li>
        </ul>
      </div>

      {/* ================= EDIT / ADD FORMS ================= */}

      {/* Form: Categories */}
      {activeView === "categories" && (
        <div className="card p-4 border shadow-sm mb-4">
          <h4 className="fw-bold mb-3">{editingId ? "Edit Category" : "Add Category"}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-4 text-start">
                <label htmlFor="catName" className="form-label small fw-semibold">Category Name</label>
                <input
                  type="text"
                  id="catName"
                  placeholder="Enter category name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-8 text-start">
                <label htmlFor="catDesc" className="form-label small fw-semibold">Description</label>
                <textarea
                  id="catDesc"
                  rows="1"
                  placeholder="Enter category description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ resize: "vertical" }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 justify-content-start">
              <div style={{ width: "180px" }}>
                <Button
                  color={"var(--blue-primary)"}
                  hover={"blue"}
                  text={editingId ? "Update Category" : "+ Add Category"}
                  type="submit"
                />
              </div>
              {editingId && (
                <button 
                  type="button" 
                  className="btn btn-outline-secondary px-4 py-2"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Form: Users (Edit Only) */}
      {activeView === "users" && editingUser && (
        <div className="card p-4 border shadow-sm mb-4">
          <h4 className="fw-bold mb-3">✏️ Edit User: {editingUser.id}</h4>
          <form onSubmit={handleUpdateUserSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={uEmail}
                  onChange={(e) => setUEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Role</label>
                <select
                  className="form-select"
                  value={uRole}
                  onChange={(e) => setURole(e.target.value)}
                >
                  <option value="BUYER">BUYER</option>
                  <option value="SELLER">SELLER</option>
                  <option value="DELIVERY">DELIVERY</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 justify-content-start">
              <div style={{ width: "150px" }}>
                <Button
                  color={"var(--blue-primary)"}
                  hover={"blue"}
                  text="Update User"
                  type="submit"
                />
              </div>
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleCancelUserEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form: Products (Edit Only) */}
      {activeView === "products" && editingProduct && (
        <div className="card p-4 border shadow-sm mb-4">
          <h4 className="fw-bold mb-3">✏️ Edit Product: {editingProduct.id}</h4>
          <form onSubmit={handleUpdateProductSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={pCategory}
                  onChange={(e) => setPCategory(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-4 text-start">
                <label className="form-label small fw-semibold">Base Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={pBasePrice}
                  onChange={(e) => setPBasePrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 text-start">
                <label className="form-label small fw-semibold">Current Bid (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={pCurrentBid}
                  onChange={(e) => setPCurrentBid(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 text-start">
                <label className="form-label small fw-semibold">End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={pEndTime ? pEndTime.substring(0, 16) : ""}
                  onChange={(e) => setPEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 justify-content-start">
              <div style={{ width: "160px" }}>
                <Button
                  color={"var(--blue-primary)"}
                  hover={"blue"}
                  text="Update Product"
                  type="submit"
                />
              </div>
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleCancelProductEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form: Bids (Edit Only) */}
      {activeView === "bids" && editingBid && (
        <div className="card p-4 border shadow-sm mb-4">
          <h4 className="fw-bold mb-3">✏️ Edit Bid: {editingBid.id}</h4>
          <form onSubmit={handleUpdateBidSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6 text-start">
                <label className="form-label small fw-semibold">Bidder Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={bBidderName}
                  onChange={(e) => setBBidderName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6 text-start">
                <label className="form-label small fw-semibold">Bid Amount (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={bBidAmount}
                  onChange={(e) => setBBidAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 justify-content-start">
              <div style={{ width: "150px" }}>
                <Button
                  color={"var(--blue-primary)"}
                  hover={"blue"}
                  text="Update Bid"
                  type="submit"
                />
              </div>
              <button 
                type="button" 
                className="btn btn-outline-secondary px-4 py-2"
                onClick={handleCancelBidEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TABLES ================= */}

      {/* Table: Categories */}
      {activeView === "categories" && (
        <div className="card p-4 border shadow-sm">
          <h4 className="fw-bold mb-3">Categories</h4>
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr style={{ fontSize: "0.9rem" }} className="text-muted">
                  <th className="px-3 py-2.5" style={{ width: "80px" }}>ID</th>
                  <th className="py-2.5" style={{ width: "200px" }}>Name</th>
                  <th className="py-2.5">Description</th>
                  <th className="px-3 py-2.5 text-center" style={{ width: "220px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="px-3 py-3 fw-bold text-secondary">{cat.id}</td>
                    <td className="py-3 fw-semibold">{cat.name}</td>
                    <td className="py-3 text-muted" style={{ fontSize: "0.9rem" }}>{cat.description}</td>
                    <td className="px-3 py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleEditClick(cat)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleDeleteClick(cat.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">No categories configured.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mock Pagination */}
          <div className="d-flex justify-content-center mt-3 gap-2">
            <button className="btn btn-primary btn-sm px-3" disabled>1</button>
            <button className="btn btn-outline-secondary btn-sm px-3">2</button>
            <button className="btn btn-outline-secondary btn-sm px-3">Next &raquo;</button>
          </div>
        </div>
      )}

      {/* Table: Users */}
      {activeView === "users" && (
        <div className="card p-4 border shadow-sm">
          <h4 className="fw-bold mb-3">Users</h4>
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr style={{ fontSize: "0.9rem" }} className="text-muted">
                  <th className="px-3 py-2.5" style={{ width: "120px" }}>User ID</th>
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Email</th>
                  <th className="py-2.5" style={{ width: "150px" }}>Role</th>
                  <th className="px-3 py-2.5 text-center" style={{ width: "220px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((usr) => (
                  <tr key={usr.id}>
                    <td className="px-3 py-3 fw-bold text-secondary">{usr.id}</td>
                    <td className="py-3 fw-semibold">{usr.name}</td>
                    <td className="py-3 text-muted">{usr.email}</td>
                    <td className="py-3">
                      <span className={`badge ${
                        usr.role === "ADMIN" ? "bg-danger" :
                        usr.role === "SELLER" ? "bg-success" :
                        usr.role === "DELIVERY" ? "bg-warning text-dark" : "bg-primary"
                      }`}>
                        {usr.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleEditUserClick(usr)}
                        >
                          ✏️ Update
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleDeleteUser(usr.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table: Products */}
      {activeView === "products" && (
        <div className="card p-4 border shadow-sm">
          <h4 className="fw-bold mb-3">Products (Auctions)</h4>
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr style={{ fontSize: "0.9rem" }} className="text-muted">
                  <th className="px-3 py-2.5" style={{ width: "120px" }}>Product ID</th>
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Base Price</th>
                  <th className="py-2.5">Current Bid</th>
                  <th className="py-2.5">End Time</th>
                  <th className="py-2.5">Status</th>
                  <th className="px-3 py-2.5 text-center" style={{ width: "220px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auctions.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-3 py-3 fw-bold text-secondary">{prod.id}</td>
                    <td className="py-3 fw-semibold">{prod.name}</td>
                    <td className="py-3 text-muted">{prod.category}</td>
                    <td className="py-3">₹{prod.basePrice.toLocaleString("en-IN")}</td>
                    <td className="py-3 text-success fw-semibold">₹{prod.currentBid.toLocaleString("en-IN")}</td>
                    <td className="py-3 text-muted" style={{ fontSize: "0.85rem" }}>
                      {new Date(prod.endTime).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="py-3">
                      <span className={`badge ${prod.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                        {prod.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleEditProductClick(prod)}
                        >
                          ✏️ Update
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleDeleteProduct(prod.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {auctions.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Table: Bids */}
      {activeView === "bids" && (
        <div className="card p-4 border shadow-sm">
          <h4 className="fw-bold mb-3">Bids</h4>
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr style={{ fontSize: "0.9rem" }} className="text-muted">
                  <th className="px-3 py-2.5" style={{ width: "120px" }}>Bid ID</th>
                  <th className="py-2.5">Product Name</th>
                  <th className="py-2.5">Bidder Name</th>
                  <th className="py-2.5">Bid Amount</th>
                  <th className="py-2.5">Time</th>
                  <th className="px-3 py-2.5 text-center" style={{ width: "220px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="px-3 py-3 fw-bold text-secondary">{bid.id}</td>
                    <td className="py-3 fw-semibold">{bid.productName}</td>
                    <td className="py-3 text-muted">{bid.bidderName}</td>
                    <td className="py-3 text-success fw-bold">₹{bid.bidAmount.toLocaleString("en-IN")}</td>
                    <td className="py-3 text-secondary" style={{ fontSize: "0.85rem" }}>
                      {new Date(bid.bidTime).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleEditBidClick(bid)}
                        >
                          ✏️ Update
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1"
                          onClick={() => handleDeleteBid(bid.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bids.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No bids found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
