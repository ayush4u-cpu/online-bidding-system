import React, { useState, useEffect } from "react";
import { getCategories, addCategory, deleteCategory, updateCategory, getAuctions } from "../utils/db";
import Button from "../components/Button";

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [auctionsCount, setAuctionsCount] = useState(18); // default count
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load categories and dynamic stats
  const loadData = () => {
    setCategories(getCategories());
    const auctions = getAuctions();
    // Base 13 + current auctions count
    setAuctionsCount(13 + auctions.length);
  };

  useEffect(() => {
    loadData();
  }, []);

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
        <div className="col-md-3">
          <div className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3">
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#e8f0fe", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              👤
            </div>
            <div>
              <span className="text-muted small fw-semibold">Users</span>
              <h2 className="fw-bold mb-0 text-primary" style={{ fontSize: "2rem" }}>24</h2>
            </div>
          </div>
        </div>

        {/* Card 2: Products */}
        <div className="col-md-3">
          <div className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3">
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#e6f4ea", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              📦
            </div>
            <div>
              <span className="text-muted small fw-semibold">Products</span>
              <h2 className="fw-bold mb-0 text-success" style={{ fontSize: "2rem" }}>{auctionsCount}</h2>
            </div>
          </div>
        </div>

        {/* Card 3: Bids */}
        <div className="col-md-3">
          <div className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3">
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#f3e8fd", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              🔨
            </div>
            <div>
              <span className="text-muted small fw-semibold">Bids</span>
              <h2 className="fw-bold mb-0" style={{ color: "#8a3ffc", fontSize: "2rem" }}>67</h2>
            </div>
          </div>
        </div>

        {/* Card 4: Revenue */}
        <div className="col-md-3">
          <div className="card h-100 p-3 border shadow-sm d-flex flex-row align-items-center gap-3">
            <div 
              style={{ width: "60px", height: "60px", backgroundColor: "#fef3d6", borderRadius: "12px" }}
              className="d-flex align-items-center justify-content-center fs-3"
            >
              ₹
            </div>
            <div>
              <span className="text-muted small fw-semibold">Revenue</span>
              <h2 className="fw-bold mb-0" style={{ color: "#d97706", fontSize: "2rem" }}>₹4,82,000</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Category Section */}
      <div className="card p-4 border shadow-sm mb-4">
        <h4 className="fw-bold mb-3">{editingId ? "Edit Category" : "Add Category"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4 text-start">
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
            <div className="col-md-8 text-start">
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

      {/* Categories Table Section */}
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
    </div>
  );
}

export default AdminDashboard;
