import React from "react";

function Navbar() {
  return (
    <div className=" bg-black text-white py-3 px-4 d-flex justify-content-between fixed-top">
      <div className=" fw-bold fs-5">Online Bidding</div>
      <div>
        <button
          style={{
            backgroundColor: "var(--blue-primary)",
          }}
          className="text-white rounded-1 border-0 px-2 py-1 mx-1 btn-hover-blue"
        >
          Login
        </button>
        <button
          style={{ backgroundColor: "var(--green-primary)" }}
          className="text-white rounded-1 border-0 px-2 py-1 mx-1 btn-hover-green"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Navbar;
