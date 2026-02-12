import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Donation.css";

export default function Donation() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    donor: "",
    amount: "",
    date: "",
    purpose: "",
    contact: "",
    email: "",
    pancard: ""
  });

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/donation")
      .then(res => res.json())
      .then(setDonations);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newDonation => setDonations(prev => [...prev, newDonation]));
    setForm({
      donor: "",
      amount: "",
      date: "",
      purpose: "",
      contact: "",
      email: "",
      pancard: ""
    });
  };

  return (
    <div className="donation-page">
      <header className="donation-header">
        <div className="donation-header-top">
          <h1>💖 Donation</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          Support our foundation’s mission. Every contribution helps fund
          scholarships, research, and student development.
        </p>

        {/* New Payment Details Section */}
        <div className="donation-payment">
          <h2>Bank Payment Details</h2>
          <div className="payment-card">
            <p className="payment-foundation">Saathaihum Foundation</p>
            <div className="payment-row">
              <span>Account Number</span>
              <strong>60534708338</strong>
            </div>
            <div className="payment-row">
              <span>IFSC Code</span>
              <strong>MAHB0002410</strong>
            </div>
            <div className="payment-row">
              <span>Branch</span>
              <strong>Dhanori</strong>
            </div>
            <div className="payment-row">
              <span>Bank</span>
              <strong>Bank of Maharashtra</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="donation-content">
        <section className="donation-campaigns">
          <h2>Active Campaigns</h2>
          <ul>
            <li>🎓 Scholarship Fund 2025</li>
            <li>🔬 Research Innovation Drive</li>
            <li>🌍 Community Outreach Program</li>
          </ul>
        </section>

        <section className="donation-actions">
          <h2>Make a Donation</h2>
          <form onSubmit={handleSubmit} className="donation-form">
            <input
              name="donor"
              placeholder="Donor Name"
              value={form.donor}
              onChange={handleChange}
              required
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <input
              name="purpose"
              placeholder="Purpose"
              value={form.purpose}
              onChange={handleChange}
              required
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="pancard"
              placeholder="PAN Card"
              value={form.pancard}
              onChange={handleChange}
              required
            />
            <button type="submit" className="donate-btn">
              💰 Donate
            </button>
          </form>

          <h2>Previous Donations</h2>
          <ul>
            {donations.length > 0 ? (
              donations.map(item => (
                <li key={item.id}>
                  {item.donor} donated ₹{item.amount} on {item.date} (
                  {item.purpose})
                </li>
              ))
            ) : (
              <li>No donations recorded yet.</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
