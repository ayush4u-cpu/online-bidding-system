import React from "react";
import Button from "../components/Button";
import add from "../assets/add.png";

function AddProductForm() {
  return (
    <form action="">
      <div className="card p-4">
        <h4 className=" px-2">Add Product for Auction</h4>
        <div className="container mt-1">
          <div className="row">
            <div className="col-4">
              <label for="pname" class="form-label">
                Product Name
              </label>
              <input
                type="text"
                id="pname"
                placeholder="Enter product name"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="col-4">
              <label for="pcategory" className="form-label">
                Select Category
              </label>
              <div className="dropdown">
                <button
                  style={{
                    border: "1px solid var(--border-light)",
                    width: "100%",
                  }}
                  className="btn dropdown-toggle d-flex align-items-center justify-content-between"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                >
                  <div className="mx-2">Select Category</div>
                </button>
                <ul style={{ width: "100%" }} class="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Product1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Product2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Product3
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-4">
              <label for="pname" class="form-label">
                Base Price (₹)
              </label>
              <input
                type="number"
                id="pname"
                placeholder="Enter product name"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label for="pdesc" class="form-label">
                Product Description
              </label>
              <textarea
                style={{ width: "100%" }}
                name=""
                id="pdesc"
                cols=""
                rows="3"
                placeholder="Product Description"
                className="form-control"
              ></textarea>
            </div>
            <div className="col-6">
              <label for="pdate" class="form-label">
                Auction End Time
              </label>
              <input
                type="datetime-local"
                id="pdate"
                placeholder="Enter product name"
                className="form-control"
                aria-describedby="passwordHelpBlock"
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
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddProductForm;
