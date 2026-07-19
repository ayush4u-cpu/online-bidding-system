import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWallet, addMoney } from "../utils/db";

function MyWallet({ role }) {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState("");

  const loadWallet = () => {
    setWallet(getWallet(role));
  };

  useEffect(() => {
    loadWallet();
  }, [role]);

  const handleAddMoneySubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      addMoney(role, numericAmount);
      setAmount("");
      loadWallet(); // refresh state
      alert(`Successfully added ₹${numericAmount.toLocaleString("en-IN")} to your wallet!`);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  if (!wallet) {
    return (
      <div className="main-content container py-4 text-center">
        <h3>Loading wallet data...</h3>
      </div>
    );
  }

  return (
    <div className="main-content container py-4 text-start" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ fontSize: "2rem" }}>My Wallet</h1>
          <p className="text-muted mb-0">Manage your balance and transactions as a <span className="fw-bold text-primary">{role}</span>.</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary">
          &larr; Back
        </button>
      </div>

      {/* Balance Card */}
      <div className="card text-white bg-dark mb-4 shadow-sm">
        <div className="card-body p-4 text-center">
          <span className="text-uppercase tracking-wider small text-white-50">Available Balance</span>
          <h2 className="display-5 fw-bold my-2">₹{wallet.balance.toLocaleString("en-IN")}</h2>
        </div>
      </div>

      {/* Add Money Form (Only for Buyer) */}
      {role === "buyer" && (
        <div className="card p-4 border shadow-sm mb-4">
          <h5 className="fw-bold mb-3">Add Money to Wallet</h5>
          <form onSubmit={handleAddMoneySubmit} className="row g-3 align-items-end">
            <div className="col-sm-9">
              <label className="form-label text-secondary small">Amount (INR)</label>
              <div className="input-group">
                <span className="input-group-text bg-white">₹</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount to add"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-sm-3">
              <button type="submit" className="btn btn-primary w-100 py-2">
                Add Money
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions list */}
      <div className="card border shadow-sm">
        <div className="card-header bg-white fw-bold py-3">
          Recent Transactions
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-muted">
                  <th className="px-4 py-3">Type</th>
                  <th className="py-3">Date</th>
                  <th className="px-4 py-3 text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {wallet.transactions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-muted">No transactions found.</td>
                  </tr>
                ) : (
                  wallet.transactions.map((tx, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">{tx.type}</td>
                      <td className="py-3 text-muted">{tx.date}</td>
                      <td className={`px-4 py-3 text-end fw-bold ${tx.amount > 0 ? "text-success" : "text-danger"}`}>
                        {tx.amount > 0 ? "+" : ""}₹{tx.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
