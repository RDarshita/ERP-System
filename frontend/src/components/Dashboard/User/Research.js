import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Research.css";

export default function Research() {
  const navigate = useNavigate();
  const [researches, setResearches] = useState([]);
  const [form, setForm] = useState({
    topic: "",
    author: "",
    publishedDate: "",
    summary: ""
  });

  // Fetch research records from backend API on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/research")
      .then(res => res.json())
      .then(data => setResearches(data));
  }, []);

  // Handle field changes for the form
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add a new research record
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => setResearches(prev => [...prev, data]));
    setForm({ topic: "", author: "", publishedDate: "", summary: "" });
  };

  return (
    <div className="research-page">
      <header className="research-header">
        <div className="research-header-top">
          <h2>🔬 Research Support</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>Access research mentorship, funding programs, and project tracking.</p>

        {/* New Research Support Services */}
        <div className="research-services">
          <div className="service-card">
            <h4>Faculty Manuscript Support</h4>
            <p>End-to-end help from formatting to final publishing support for faculty manuscripts.</p>
            <span className="service-tag">Formatting → Publishing</span>
          </div>
          <div className="service-card">
            <h4>Proposal Writing</h4>
            <p>Guidance for writing proposals for research grant projects and institutional funding.</p>
            <span className="service-tag">Research Grant Projects</span>
          </div>
          <div className="service-card">
            <h4>Data Analysis & Typing</h4>
            <p>Support for data analysis documentation, report preparation, and typewriting assistance.</p>
            <span className="service-tag">Data & Typewriting Support</span>
          </div>
        </div>
      </header>

      <main className="research-content">
        <section className="research-info">
          <h3>Ongoing Research Overview</h3>
          <ul>
            <li>Active Research Projects: {researches.length}</li>
            <li>
              Published Papers:{" "}
              {
                researches.filter(
                  item =>
                    item.summary &&
                    (item.summary.toLowerCase().includes("published") ||
                      item.summary.toLowerCase().includes("paper"))
                ).length
              }
            </li>
            <li>
              Pending Collaboration:{" "}
              {
                researches.filter(
                  item =>
                    item.summary &&
                    item.summary.toLowerCase().includes("pending")
                ).length
              }{" "}
              (Approval in Progress)
            </li>
          </ul>
        </section>

        <section className="research-list">
          <h3>Your Research Submissions</h3>
          <ul>
            {researches.length > 0 ? (
              researches.map(item => (
                <li key={item.id}>
                  <b>{item.topic}</b> by {item.author} ({item.publishedDate})
                  <br />
                  <i>{item.summary}</i>
                </li>
              ))
            ) : (
              <li>No research records yet.</li>
            )}
          </ul>
        </section>

        <section className="research-actions">
          <h3>Submit New Research</h3>
          <form onSubmit={handleSubmit} className="research-form">
            <input
              name="topic"
              placeholder="Research Topic"
              value={form.topic}
              onChange={handleChange}
              required
            />
            <input
              name="author"
              placeholder="Author Name"
              value={form.author}
              onChange={handleChange}
              required
            />
            <input
              name="publishedDate"
              placeholder="Published Date"
              type="date"
              value={form.publishedDate}
              onChange={handleChange}
              required
            />
            <input
              name="summary"
              placeholder="Summary"
              value={form.summary}
              onChange={handleChange}
              required
            />
            <button type="submit">Add Research</button>
          </form>
        </section>
      </main>
    </div>
  );
}
