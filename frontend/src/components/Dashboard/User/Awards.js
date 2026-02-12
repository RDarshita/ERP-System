import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Awards.css";

export default function Awards() {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [form, setForm] = useState({ title: "", recipient: "", date: "" });

  // Fetch awards from backend
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/awards")
      .then(res => res.json())
      .then(setAwards);
  }, []);

  // Form handler to add new award using backend API
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/awards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newAward => setAwards(prev => [...prev, newAward]));
    setForm({ title: "", recipient: "", date: "" });
  };

  return (
    <div className="awards-page">
      <header className="awards-header">
        <div className="awards-header-top">
          <h1>🏅 Awards & Recognition</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          Track your achievements, certificates, and awards received through
          academic and extracurricular excellence.
        </p>

        {/* NEW APPLICATION INFO STRIP */}
        <div className="awards-application-strip">
          <div className="app-pill anytime">
            🕒 Applications for Awards
          </div>
          <div className="app-pill nominee">
            🎓 Selected Candidates as Nominee (No fees to apply)
          </div>
          <div className="app-pill sponsor">
            💼 Sponsor Category (Application with fees)
          </div>
        </div>
      </header>

      <main className="awards-content">
        <section className="awards-list">
          <h2>Your Awards</h2>
          <ul>
            {awards.length > 0 ? (
              awards.map(item => (
                <li key={item.id}>
                  🏆 {item.title} — {item.recipient} — {item.date}
                </li>
              ))
            ) : (
              <>
                <li>🏆 Best Research Paper - AI in Education</li>
                <li>🎖 Leadership Recognition - Saathaihum Foundation</li>
                <li>⭐ 2 Awards Received in 2025</li>
              </>
            )}
          </ul>
        </section>

        <section className="awards-actions">
          <h2>Add New Award</h2>
          <form onSubmit={handleSubmit} className="awards-form">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="recipient"
              placeholder="Recipient"
              value={form.recipient}
              onChange={handleChange}
              required
            />
            <input
              name="date"
              placeholder="Date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Award</button>
          </form>
          <button onClick={() => alert("View Certificates clicked")}>
            📜 View Certificates
          </button>
          <button onClick={() => alert("Download Report clicked")}>
            ⬇ Download Report
          </button>
        </section>
      </main>
    </div>
  );
}
