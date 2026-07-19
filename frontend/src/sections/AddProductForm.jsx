import React, { useState } from "react";
import Button from "../components/Button";
import add from "../assets/add.png";
import { addAuction } from "../utils/db";

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !basePrice || !description || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const price = Number(basePrice);
    if (isNaN(price) || price <= 0) {
      alert("Base price must be a positive number.");
      return;
    }

    const newProduct = {
      name,
      category,
      basePrice: price,
      description,
      endTime
    };

    addAuction(newProduct);
    alert("Product added successfully for auction!");
    
    // Reset Form
    setName("");
    setCategory("");
    setBasePrice("");
    setDescription("");
    setEndTime("");

    // Trigger state reload in parent
    if (onProductAdded) {
      onProductAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card p-4">
        <h4 className="px-2">Add Product for Auction</h4>
        <div className="container mt-1">
          <div className="row">
            <div className="col-4">
              <label htmlFor="pname" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                id="pname"
                placeholder="Enter product name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-4">
              <label htmlFor="pcategory" className="form-label">
                Select Category
              </label>
              <select
                id="pcategory"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Fashion">Fashion</option>
                <option value="Collectibles">Collectibles</option>
                <option value="Accessories">Accessories</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            <div className="col-4">
              <label htmlFor="basePrice" className="form-label">
                Base Price (₹)
              </label>
              <input
                type="number"
                id="basePrice"
                placeholder="Enter base price"
                className="form-control"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="pdesc" className="form-label">
                Product Description
              </label>
              <textarea
                style={{ width: "100%" }}
                id="pdesc"
                rows="3"
                placeholder="Product Description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="col-6">
              <label htmlFor="pdate" className="form-label">
                Auction End Time
              </label>
              <input
                type="datetime-local"
                id="pdate"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start mt-3">
          <div className="d-flex px-2">
            <Button
              color={"var(--green-primary)"}
              logo={add}
              hover={"green"}
              text={"Add Product"}
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddProductForm;
