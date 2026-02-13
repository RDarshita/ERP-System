import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Awards.css";

export default function Awards() {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [form, setForm] = useState({ title: "", recipient: "", date: "" });

  const getDefaultAwards = () => [
    {
      id: 1,
      title: "Best Research Paper",
      recipient: "AI in Education",
      date: "2025-11-10",
      category: "Academic"
    },
    {
      id: 2,
      title: "Leadership Recognition",
      recipient: "Saathaihum Foundation",
      date: "2025-08-15",
      category: "Community"
    },
    {
      id: 3,
      title: "Innovation Catalyst",
      recipient: "Campus Startup Lab",
      date: "2025-06-02",
      category: "Innovation"
    }
  ];

  // Fetch awards from backend
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/awards")
      .then(res => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) && data.length > 0 ? data : getDefaultAwards();
        setAwards(safeData);
      })
      .catch(() => setAwards(getDefaultAwards()));
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

  const stats = useMemo(() => {
    const total = awards.length;
    const years = new Set(awards.map((item) => (item.date || "").slice(0, 4)).filter(Boolean));
    return [
      { label: "Awards Earned", value: total },
      { label: "Seasons", value: years.size || 1 },
      { label: "Latest", value: awards[awards.length - 1]?.title || "-" }
    ];
  }, [awards]);

  const featuredAward = awards[0];

  const formatDate = (value) => {
    if (!value) return "TBD";
    return new Date(value).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="awards-page">
      <section className="awards-hero">
        <div className="awards-hero__left">
          <div className="awards-hero__top">
            <span className="awards-hero__eyebrow">Honor Roll</span>
            <button className="awards-back-btn" onClick={() => navigate(-1)}>
              Back to Dashboard
            </button>
          </div>
          <h1>Awards & Recognition</h1>
          <p>
            Showcase milestones, certificates, and standout achievements. Each award is a marker of excellence across
            academics, leadership, and innovation.
          </p>
          <div className="awards-hero__cta">
            <button className="awards-btn awards-btn--primary" type="button">
              Submit Nomination
            </button>
            <button className="awards-btn awards-btn--ghost" type="button">
              View Hall of Fame
            </button>
          </div>
          <div className="awards-hero__strip">
            <span>Applications open</span>
            <span>Nominee: no fees</span>
            <span>Sponsor: fees apply</span>
          </div>
        </div>
        <div className="awards-hero__right">
          <div className="awards-podium">
            <div className="awards-podium__ring">
              <span>Top Award</span>
              <h3>{featuredAward?.title || "Your next award"}</h3>
              <p>{featuredAward?.recipient || "Nominate a standout project"}</p>
            </div>
            <div className="awards-podium__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="awards-stat">
                  <p>{stat.label}</p>
                  <h4>{stat.value}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="awards-body">
        <section className="awards-gallery">
          <div className="awards-gallery__header">
            <h2>Your Awards</h2>
            <span>{awards.length} total</span>
          </div>
          <div className="awards-grid">
            {awards.length > 0 ? (
              awards.map((item) => (
                <article key={item.id} className="awards-card">
                  <div className="awards-card__badge">{item.category || "Achievement"}</div>
                  <h3>{item.title}</h3>
                  <p>{item.recipient}</p>
                  <div className="awards-card__meta">
                    <span>{formatDate(item.date)}</span>
                    <span>Verified</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="awards-empty">
                <h3>No awards yet</h3>
                <p>Add your first achievement to start the showcase.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="awards-side">
          <section className="awards-panel">
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
              <button type="submit" className="awards-btn awards-btn--primary">
                Add Award
              </button>
            </form>
          </section>

          <section className="awards-panel awards-panel--actions">
            <h2>Award Toolkit</h2>
            <button className="awards-btn" onClick={() => alert("View Certificates clicked")}>
              View Certificates
            </button>
            <button className="awards-btn" onClick={() => alert("Download Report clicked")}>
              Download Report
            </button>
          </section>
        </aside>
      </main>
    </div>
  );
}
