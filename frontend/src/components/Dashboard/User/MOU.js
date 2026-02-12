import React, { useState, useEffect } from "react";
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

  // Fetch MOUs from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/mou")
      .then(res => res.json())
      .then(setMOUs);
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

  return (
    <div className="mou-page">
      {/* Header Section */}
      <header className="mou-header">
        <div className="mou-header-top">
          <h1>📄 Memorandum of Understanding (MOU)</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          View and manage signed MOUs between academic institutions and
          industry partners.
        </p>
      </header>

      {/* Content Section */}
      <main className="mou-content">
        {/* Recent MOUs */}
        <section className="mou-card">
          <h2>Recent MOUs</h2>
          <ul>
            {mous.length > 0 ? (
              mous
                .slice(-3)
                .reverse()
                .map(m => (
                  <li key={m.id}>
                    {m.title} with {m.partnerOrganization} ({m.status})
                    <br />
                    Valid: {m.startDate?.slice(0, 10)} to{" "}
                    {m.endDate ? m.endDate.slice(0, 10) : "ongoing"}
                    <br />
                    {m.description}
                  </li>
                ))
            ) : (
              <>
                <li>🤝 IIT Delhi – Research Collaboration</li>
                <li>🌐 Google India – Internship Partnership</li>
                <li>🏢 Infosys – Technical Training Alliance</li>
              </>
            )}
          </ul>
        </section>

        {/* Right column: upload + templates + add MOU */}
        <section className="mou-actions">
          <h2>Signed MOU Files (University)</h2>
          <p className="mou-subtext">
            Upload files shared by the university and view signed MOUs stored in the system.
          </p>
          <div className="mou-file-actions">
            <button className="mou-btn primary" onClick={handleUniversityFileUpload}>
              📤 Upload MOU from University
            </button>
            <button className="mou-btn secondary" onClick={handleViewUploadedFiles}>
              📁 View Uploaded MOU Files
            </button>
          </div>

          <div className="mou-divider" />

          <h2>MOU Templates (Our Formats)</h2>
          <p className="mou-subtext">
            Maintain standard MOU formats used by the institute for collaborations.
          </p>
          <form className="mou-template-form" onSubmit={handleTemplateAdd}>
            <input
              type="text"
              placeholder="Template name (e.g., Industry Collaboration Format)"
              value={templateName}
              onChange={e => setTemplateName(e.target.value)}
            />
            <button type="submit" className="mou-btn">
              ➕ Add MOU Format
            </button>
          </form>

          <div className="mou-divider" />

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
              📝 Save MOU Details
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
