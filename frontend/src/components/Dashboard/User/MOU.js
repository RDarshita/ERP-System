import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MOU.css";

export default function MOU() {
  const navigate = useNavigate();

  // State for MOUs from backend
  const [mous, setMOUs] = useState([]);
  // State for adding new MOU
  const [form, setForm] = useState({
    title: "",
    partnerOrganization: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "active"
  });

  // Simple local state for template name (format added by you)
  const [templateName, setTemplateName] = useState("");

  const getDefaultMOUs = () => [
    {
      id: 1,
      title: "Research Collaboration",
      partnerOrganization: "IIT Delhi",
      startDate: "2024-03-10",
      endDate: "2027-03-10",
      description: "Joint research labs for AI and sustainable systems.",
      status: "active",
      category: "Academic"
    },
    {
      id: 2,
      title: "Internship Partnership",
      partnerOrganization: "Google India",
      startDate: "2023-07-01",
      endDate: "2026-07-01",
      description: "Structured internship pipeline and hiring days.",
      status: "active",
      category: "Industry"
    },
    {
      id: 3,
      title: "Technical Training Alliance",
      partnerOrganization: "Infosys",
      startDate: "2022-11-15",
      endDate: "2025-11-15",
      description: "Skill bridge programs for cloud and cybersecurity.",
      status: "active",
      category: "Industry"
    },
    {
      id: 4,
      title: "Global Exchange",
      partnerOrganization: "University of Melbourne",
      startDate: "2021-02-01",
      endDate: "2024-02-01",
      description: "Faculty exchange and joint summer programs.",
      status: "expired",
      category: "Academic"
    }
  ];

  // Fetch MOUs from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/mou")
      .then(res => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) && data.length > 0 ? data : getDefaultMOUs();
        setMOUs(safeData);
      })
      .catch(() => setMOUs(getDefaultMOUs()));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/mou", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(mou => setMOUs(prev => [...prev, mou]));
    setForm({
      title: "",
      partnerOrganization: "",
      startDate: "",
      endDate: "",
      description: "",
      status: "active"
    });
  };

  const handleTemplateAdd = e => {
    e.preventDefault();
    if (!templateName.trim()) return;
    alert(`MOU format "${templateName}" added (frontend only – no backend yet).`);
    setTemplateName("");
  };

  const handleUniversityFileUpload = () => {
    alert("Upload MOU file from University clicked (integrate file upload backend later).");
  };

  const handleViewUploadedFiles = () => {
    alert("View uploaded MOU files clicked (show list from backend later).");
  };

  const stats = useMemo(() => {
    const total = mous.length;
    const active = mous.filter((m) => (m.status || "").toLowerCase() === "active").length;
    const partnerCount = new Set(mous.map((m) => m.partnerOrganization)).size || total;
    const years = new Set(mous.map((m) => (m.startDate || "").slice(0, 4)).filter(Boolean)).size || 1;
    return [
      { label: "Active MOUs", value: active },
      { label: "Total Partners", value: partnerCount },
      { label: "Years of Growth", value: years },
      { label: "Total MOUs", value: total }
    ];
  }, [mous]);

  const collaborations = [
    { name: "IIT Delhi", type: "Academic", focus: "AI Research Labs" },
    { name: "Google India", type: "Industry", focus: "Internship Pipeline" },
    { name: "Infosys", type: "Industry", focus: "Skill Bridge Programs" },
    { name: "Univ. of Melbourne", type: "Academic", focus: "Faculty Exchange" },
    { name: "AWS Educate", type: "Industry", focus: "Cloud Certifications" },
    { name: "NASSCOM", type: "Ecosystem", focus: "Innovation Network" }
  ];

  const growthMilestones = [
    { year: "2021", value: 35, label: "First national partnerships" },
    { year: "2022", value: 55, label: "Industry immersion programs" },
    { year: "2023", value: 72, label: "International collaborations" },
    { year: "2024", value: 88, label: "Expanded research exchange" },
    { year: "2025", value: 100, label: "Multi-sector trust network" }
  ];

  const formatDate = (value) => {
    if (!value) return "TBD";
    return new Date(value).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="mou-page">
      <section className="mou-hero">
        <div className="mou-hero__content">
          <div className="mou-hero__top">
            <span className="mou-hero__eyebrow">Trust Ledger</span>
            <button className="mou-back-btn" onClick={() => navigate("/dashboard/user/")}>
              Back to Dashboard
            </button>
          </div>
          <h1>Memorandum of Understanding</h1>
          <p>
            Saathium Foundation builds enduring collaborations with universities, companies, and global partners to
            accelerate student impact. Explore verified growth, active progress, and trusted alliances.
          </p>
          <div className="mou-hero__meta">
            <div>
              <span>Verified Partners</span>
              <strong>{stats[1].value}</strong>
            </div>
            <div>
              <span>Active MOUs</span>
              <strong>{stats[0].value}</strong>
            </div>
            <div>
              <span>Foundation Growth</span>
              <strong>{stats[2].value} yrs</strong>
            </div>
          </div>
        </div>
        <div className="mou-hero__progress">
          <div className="mou-progress-card">
            <h3>Collaboration Progress</h3>
            <div className="mou-progress-steps">
              <div className="mou-progress-step active">
                <span>01</span>
                <p>Discovery</p>
              </div>
              <div className="mou-progress-step active">
                <span>02</span>
                <p>Negotiation</p>
              </div>
              <div className="mou-progress-step active">
                <span>03</span>
                <p>Execution</p>
              </div>
              <div className="mou-progress-step">
                <span>04</span>
                <p>Impact</p>
              </div>
            </div>
          </div>
          <div className="mou-trust-card">
            <h3>Trust Highlights</h3>
            <p>Regular audits, transparent reporting, and multi-year partnerships build confidence.</p>
            <div className="mou-trust-badges">
              <span>Verified MOUs</span>
              <span>Annual Reviews</span>
              <span>Global Reach</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mou-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="mou-stat">
            <p>{stat.label}</p>
            <h3>{stat.value}</h3>
          </div>
        ))}
      </section>

      <main className="mou-content">
        <section className="mou-column mou-column--left">
          <section className="mou-panel">
            <div className="mou-panel__header">
              <h2>Strategic Collaborations</h2>
              <span>Trusted network</span>
            </div>
            <div className="mou-collab-grid">
              {collaborations.map((item) => (
                <article key={item.name} className="mou-collab-card">
                  <h3>{item.name}</h3>
                  <p>{item.focus}</p>
                  <span>{item.type}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="mou-panel">
            <div className="mou-panel__header">
              <h2>Foundation Growth</h2>
              <span>Progress index</span>
            </div>
            <div className="mou-growth">
              {growthMilestones.map((item) => (
                <div key={item.year} className="mou-growth-row">
                  <div className="mou-growth-meta">
                    <strong>{item.year}</strong>
                    <span>{item.label}</span>
                  </div>
                  <div className="mou-growth-bar">
                    <div className="mou-growth-fill" style={{ width: `${item.value}%` }} />
                  </div>
                  <span className="mou-growth-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mou-panel">
            <div className="mou-panel__header">
              <h2>Recent MOUs</h2>
              <span>Latest activity</span>
            </div>
            <div className="mou-recent-list">
              {(mous.length > 0 ? mous.slice(-4).reverse() : getDefaultMOUs()).map((m) => (
                <article key={`${m.title}-${m.partnerOrganization}`} className="mou-recent-card">
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.partnerOrganization}</p>
                  </div>
                  <div className="mou-recent-meta">
                    <span>{m.status || "active"}</span>
                    <span>
                      {formatDate(m.startDate)} - {m.endDate ? formatDate(m.endDate) : "Ongoing"}
                    </span>
                  </div>
                  <p className="mou-recent-desc">{m.description}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="mou-column mou-column--right">
          <section className="mou-panel mou-panel--actions">
            <h2>Signed MOU Files</h2>
            <p className="mou-subtext">
              Upload and verify signed documents for institutional transparency.
            </p>
            <div className="mou-file-actions">
              <button className="mou-btn primary" onClick={handleUniversityFileUpload}>
                Upload MOU from University
              </button>
              <button className="mou-btn secondary" onClick={handleViewUploadedFiles}>
                View Uploaded MOU Files
              </button>
            </div>
          </section>

          <section className="mou-panel mou-panel--actions">
            <h2>MOU Templates</h2>
            <p className="mou-subtext">
              Maintain approved formats for future collaborations.
            </p>
            <form className="mou-template-form" onSubmit={handleTemplateAdd}>
              <input
                type="text"
                placeholder="Template name (e.g., Industry Collaboration Format)"
                value={templateName}
                onChange={e => setTemplateName(e.target.value)}
              />
              <button type="submit" className="mou-btn">
                Add MOU Format
              </button>
            </form>
          </section>

          <section className="mou-panel">
            <h2>Add New MOU Record</h2>
            <form onSubmit={handleSubmit} className="mou-form">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <input
                name="partnerOrganization"
                value={form.partnerOrganization}
                onChange={handleChange}
                placeholder="Partner Organization"
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
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
              <button type="submit" className="mou-btn">
                Save MOU Details
              </button>
            </form>
          </section>
        </aside>
      </main>
    </div>
  );
}
