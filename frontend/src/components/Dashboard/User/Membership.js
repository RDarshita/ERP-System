import React, { useState, useEffect } from "react";
import "./CSS/Membership.css";

export default function Membership() {
  const [memberships, setMemberships] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    organization: "",
    membershipType: "",
    startDate: "",
    endDate: "",
    status: "active"
  });

  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/membership")
      .then(res => res.json())
      .then(setMemberships);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(membership => setMemberships(prev => [...prev, membership]));
    setForm({
      userId: "",
      organization: "",
      membershipType: "",
      startDate: "",
      endDate: "",
      status: "active"
    });
  };

  return (
    <div className="membership-page">
      <header className="membership-header">
        <h2>👥 Memberships</h2>
        <p>Manage your memberships and view available membership categories.</p>

        {/* New Membership Pricing Info */}
        <div className="membership-pricing">
          <div className="membership-card student">
            <h3>Student</h3>
            <p>Annual membership for individual students.</p>
            <div className="price-row">
              <span>Indian</span>
              <strong>₹ 500</strong>
            </div>
          </div>

          <div className="membership-card faculty">
            <h3>Faculty / Institute</h3>
            <p>Membership for faculty members or institutions.</p>
            <div className="price-row">
              <span>Indian</span>
              <strong>₹ 1,000</strong>
            </div>
          </div>

          <div className="membership-card university">
            <h3>University</h3>
            <p>Comprehensive membership at university level.</p>
            <div className="price-row">
              <span>Indian</span>
              <strong>₹ 2,000</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="membership-content">
        <section className="membership-list">
          <h3>Existing Memberships</h3>
          <ul>
            {memberships.length > 0 ? (
              memberships.map(m => (
                <li key={m.id}>
                  <strong>{m.name}</strong> ({m.email}) | {m.organization} |{" "}
                  {m.membershipType} | {m.status}
                </li>
              ))
            ) : (
              <li>No memberships added yet.</li>
            )}
          </ul>
        </section>

        <section className="membership-form-section">
          <h3>Add New Membership</h3>
          <form onSubmit={handleSubmit} className="membership-form">
            <input
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="User ID"
              required
            />
            <input
              name="organization"
              value={form.organization}
              onChange={handleChange}
              placeholder="Organization"
              required
            />
            <input
              name="membershipType"
              value={form.membershipType}
              onChange={handleChange}
              placeholder="Membership Type (Student / Faculty / University)"
              required
            />
            <input
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <input
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
            <button type="submit">Add Membership</button>
          </form>
        </section>
      </main>
    </div>
  );
}
