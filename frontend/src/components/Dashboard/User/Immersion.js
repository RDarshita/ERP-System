import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Immersion.css";

export default function Immersion() {
  const navigate = useNavigate();
  const [immersions, setImmersions] = useState([]);
  const [activeImmersionId, setActiveImmersionId] = useState(null);
  const [activeForm, setActiveForm] = useState("industry");

  // NEW: academic -> industry form state
  const [academicToIndustry, setAcademicToIndustry] = useState({
    industryName: "",
    industryEmail: "",
    industrySkypeId: "",
    industryContact: "",
    industryLocation: "",
    industrySkillsSubjects: "",
    industryExperienceLookingFor: "",
    industryDescription: "",
    industryResume: null
  });

  // NEW: industry -> academic form state
  const [industryToAcademic, setIndustryToAcademic] = useState({
    academicName: "",
    academicContact: "",
    academicEmail: "",
    academicLocation: "",
    academicPrograms: "",
    academicSpecialization: "",
    academicSubject: "",
    academicSkypeId: ""
  });

  const getDefaultImmersions = () => [
    {
      id: 1,
      program: "Data Analytics Immersion",
      institution: "DeltaX Labs",
      startDate: "2025-07-10",
      endDate: "2025-11-20",
      description: "Applied analytics for campus operations with real-world datasets.",
      status: "Ongoing"
    },
    {
      id: 2,
      program: "Smart Manufacturing Sprint",
      institution: "ForgeWorks",
      startDate: "2025-09-01",
      endDate: "2025-10-15",
      description: "Automation workflows and lean production lab exposure.",
      status: "Completed"
    },
    {
      id: 3,
      program: "Fintech Systems Lab",
      institution: "NovaLedger",
      startDate: "2025-11-05",
      endDate: "2026-01-30",
      description: "Compliance automation and secure transaction modeling.",
      status: "Upcoming"
    }
  ];

  const deriveStatus = (item) => {
    if (item.status) return item.status;
    const now = new Date();
    const start = item.startDate ? new Date(item.startDate) : null;
    const end = item.endDate ? new Date(item.endDate) : null;
    if (end && end < now) return "Completed";
    if (start && start > now) return "Upcoming";
    return "Ongoing";
  };

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/immersion")
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) && data.length > 0 ? data : getDefaultImmersions();
        setImmersions(safeData);
        setActiveImmersionId(safeData[0]?.id || null);
      })
      .catch(() => {
        const defaults = getDefaultImmersions();
        setImmersions(defaults);
        setActiveImmersionId(defaults[0]?.id || null);
      });
  }, []);

  // NEW: handlers for new forms
  const handleAcademicToIndustryChange = e =>
    setAcademicToIndustry({
      ...academicToIndustry,
      [e.target.name]: e.target.value
    });

  const handleIndustryResumeChange = e => {
    const file = e.target.files && e.target.files[0];
    setAcademicToIndustry(prev => ({
      ...prev,
      industryResume: file || null
    }));
  };

  const handleIndustryToAcademicChange = e =>
    setIndustryToAcademic({
      ...industryToAcademic,
      [e.target.name]: e.target.value
    });

  // NEW: stub submit handlers – integrate with backend later
  const handleAcademicToIndustrySubmit = e => {
    e.preventDefault();
    console.log("Academic → Industry form submitted", academicToIndustry);
    setAcademicToIndustry({
      industryName: "",
      industryEmail: "",
      industrySkypeId: "",
      industryContact: "",
      industryLocation: "",
      industrySkillsSubjects: "",
      industryExperienceLookingFor: "",
      industryDescription: "",
      industryResume: null
    });
  };

  const handleIndustryToAcademicSubmit = e => {
    e.preventDefault();
    console.log("Industry → Academic form submitted", industryToAcademic);
    setIndustryToAcademic({
      academicName: "",
      academicContact: "",
      academicEmail: "",
      academicLocation: "",
      academicPrograms: "",
      academicSpecialization: "",
      academicSubject: "",
      academicSkypeId: ""
    });
  };

  // helper to go to Donation page
  const goToDonation = () => navigate("/dashboard/user/donation");

  const stats = useMemo(() => {
    const total = immersions.length;
    const ongoing = immersions.filter(item => deriveStatus(item) === "Ongoing").length;
    const upcoming = immersions.filter(item => deriveStatus(item) === "Upcoming").length;
    const completed = immersions.filter(item => deriveStatus(item) === "Completed").length;
    return [
      { label: "Active Tracks", value: total, tone: "teal" },
      { label: "Ongoing", value: ongoing, tone: "blue" },
      { label: "Upcoming", value: upcoming, tone: "gold" },
      { label: "Completed", value: completed, tone: "violet" }
    ];
  }, [immersions]);

  const services = [
    {
      title: "Industry Residency",
      detail: "Placement-ready immersion with practical mentoring and lab exposure.",
      tag: "Hands-on Training"
    },
    {
      title: "Faculty Sabbaticals",
      detail: "Bridge academic insights with production-grade workflows and tooling.",
      tag: "Academic Exchange"
    },
    {
      title: "Collaborative Studios",
      detail: "Joint problem solving for research, prototypes, and pilot programs.",
      tag: "Co-build Projects"
    }
  ];

  const activeImmersion = immersions.find(item => item.id === activeImmersionId) || immersions[0];

  const formatDate = (date) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="immersion-page">
      <section className="immersion-hero">
        <div className="immersion-hero__text">
          <span className="immersion-hero__eyebrow">Immersion Atlas</span>
          <h1 className="immersion-hero__title">Academic-Industry Immersion</h1>
          <p className="immersion-hero__subtitle">
            Navigate industry collaborations, faculty exchanges, and internship milestones through a focused immersion hub.
          </p>
          <div className="immersion-hero__cta">
            <button className="immersion-btn immersion-btn--primary" type="button" onClick={goToDonation}>
              Support Immersion
            </button>
            <button className="immersion-btn immersion-btn--ghost" type="button" onClick={() => navigate(-1)}>
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="immersion-passport">
          <div className="immersion-passport__header">
            <h3>Immersion Passport</h3>
            <span className="immersion-passport__badge">Live</span>
          </div>
          <div className="immersion-passport__body">
            <div>
              <p>Active track</p>
              <h4>{activeImmersion?.program || "No active track"}</h4>
            </div>
            <div>
              <p>Host institute</p>
              <h4>{activeImmersion?.institution || "-"}</h4>
            </div>
            <div>
              <p>Next milestone</p>
              <h4>{formatDate(activeImmersion?.endDate)}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="immersion-stats-strip">
        {stats.map((stat) => (
          <div key={stat.label} className={`immersion-stat immersion-stat--${stat.tone}`}>
            <p>{stat.label}</p>
            <h3>{stat.value}</h3>
          </div>
        ))}
      </section>

      <section className="immersion-paths">
        {services.map((service) => (
          <article key={service.title} className="immersion-path">
            <div>
              <h4>{service.title}</h4>
              <p>{service.detail}</p>
            </div>
            <span>{service.tag}</span>
          </article>
        ))}
      </section>

      <main className="immersion-main">
        <section className="immersion-timeline">
          <div className="immersion-timeline__header">
            <h2>Immersion Timeline</h2>
            <p>Choose a track to view its current pulse.</p>
          </div>
          <div className="immersion-timeline__list">
            {immersions.map((item) => (
              <article
                key={item.id}
                className={`immersion-timeline__item ${activeImmersionId === item.id ? "active" : ""}`}
                onClick={() => setActiveImmersionId(item.id)}
              >
                <div className="immersion-timeline__content">
                  <div>
                    <h3>{item.program}</h3>
                    <p>{item.institution}</p>
                  </div>
                  <span className={`immersion-badge immersion-badge--${deriveStatus(item).toLowerCase()}`}>
                    {deriveStatus(item)}
                  </span>
                </div>
                <div className="immersion-timeline__meta">
                  <span>{formatDate(item.startDate)}</span>
                  <span>-</span>
                  <span>{formatDate(item.endDate)}</span>
                </div>
                <p className="immersion-timeline__summary">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="immersion-dock">
          <div className="immersion-spotlight-card">
            <h2>Spotlight</h2>
            {activeImmersion ? (
              <>
                <h3>{activeImmersion.program}</h3>
                <p>{activeImmersion.institution}</p>
                <div className="immersion-spotlight__meta">
                  <span>{formatDate(activeImmersion.startDate)}</span>
                  <span>{formatDate(activeImmersion.endDate)}</span>
                  <span>{deriveStatus(activeImmersion)}</span>
                </div>
                <p className="immersion-spotlight__summary">{activeImmersion.description}</p>
              </>
            ) : (
              <p className="immersion-muted">Select a track to view details.</p>
            )}
          </div>

          <div className="immersion-form-card">
            <div className="immersion-form-card__top">
              <div className="immersion-tabs">
                <button
                  type="button"
                  className={`immersion-tab ${activeForm === "industry" ? "active" : ""}`}
                  onClick={() => setActiveForm("industry")}
                >
                  Industry Expert
                </button>
                <button
                  type="button"
                  className={`immersion-tab ${activeForm === "academic" ? "active" : ""}`}
                  onClick={() => setActiveForm("academic")}
                >
                  Academic University
                </button>
              </div>
              <div className="immersion-fee-box">
                <p>Immersion Fees</p>
                <div>
                  <span>Indian</span>
                  <button type="button" className="link-button" onClick={goToDonation}>
                    Donate For Good
                  </button>
                </div>
                <div>
                  <span>Non-Indian</span>
                  <button type="button" className="link-button" onClick={goToDonation}>
                    Donate For Good
                  </button>
                </div>
              </div>
            </div>

            {activeForm === "industry" ? (
              <form className="immersion-form" onSubmit={handleAcademicToIndustrySubmit}>
                <h4>Industry Expert (Register Here)</h4>
                <input
                  name="industryName"
                  placeholder="Name of Industry"
                  value={academicToIndustry.industryName}
                  onChange={handleAcademicToIndustryChange}
                  required
                />
                <input
                  name="industryEmail"
                  type="email"
                  placeholder="Email"
                  value={academicToIndustry.industryEmail}
                  onChange={handleAcademicToIndustryChange}
                  required
                />
                <div className="immersion-form__row">
                  <input
                    name="industrySkypeId"
                    placeholder="Skype ID"
                    value={academicToIndustry.industrySkypeId}
                    onChange={handleAcademicToIndustryChange}
                  />
                  <input
                    name="industryContact"
                    placeholder="Contact Number"
                    value={academicToIndustry.industryContact}
                    onChange={handleAcademicToIndustryChange}
                    required
                  />
                </div>
                <div className="immersion-form__row">
                  <input
                    name="industryLocation"
                    placeholder="Location"
                    value={academicToIndustry.industryLocation}
                    onChange={handleAcademicToIndustryChange}
                    required
                  />
                  <input
                    name="industrySkillsSubjects"
                    placeholder="Skills and Subjects looking at"
                    value={academicToIndustry.industrySkillsSubjects}
                    onChange={handleAcademicToIndustryChange}
                    required
                  />
                </div>
                <input
                  name="industryExperienceLookingFor"
                  placeholder="Experience of candidate looking for"
                  value={academicToIndustry.industryExperienceLookingFor}
                  onChange={handleAcademicToIndustryChange}
                  required
                />
                <textarea
                  name="industryDescription"
                  placeholder="Description of industry (max ~80 words)"
                  value={academicToIndustry.industryDescription}
                  onChange={handleAcademicToIndustryChange}
                  rows={3}
                />
                <label className="immersion-upload-label">Upload Resume</label>
                <input
                  type="file"
                  name="industryResume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleIndustryResumeChange}
                />
                <button type="submit">Submit Industry Details</button>
              </form>
            ) : (
              <form className="immersion-form" onSubmit={handleIndustryToAcademicSubmit}>
                <h4>Academic University (Register Here)</h4>
                <input
                  name="academicName"
                  placeholder="Name of University / Institute"
                  value={industryToAcademic.academicName}
                  onChange={handleIndustryToAcademicChange}
                  required
                />
                <div className="immersion-form__row">
                  <input
                    name="academicContact"
                    placeholder="Contact Number"
                    value={industryToAcademic.academicContact}
                    onChange={handleIndustryToAcademicChange}
                    required
                  />
                  <input
                    name="academicEmail"
                    type="email"
                    placeholder="Email"
                    value={industryToAcademic.academicEmail}
                    onChange={handleIndustryToAcademicChange}
                    required
                  />
                </div>
                <input
                  name="academicLocation"
                  placeholder="Location"
                  value={industryToAcademic.academicLocation}
                  onChange={handleIndustryToAcademicChange}
                  required
                />
                <div className="immersion-form__row">
                  <input
                    name="academicPrograms"
                    placeholder="Programs (e.g. BBA, BTech)"
                    value={industryToAcademic.academicPrograms}
                    onChange={handleIndustryToAcademicChange}
                    required
                  />
                  <input
                    name="academicSpecialization"
                    placeholder="Specialization"
                    value={industryToAcademic.academicSpecialization}
                    onChange={handleIndustryToAcademicChange}
                    required
                  />
                </div>
                <div className="immersion-form__row">
                  <input
                    name="academicSubject"
                    placeholder="Subject"
                    value={industryToAcademic.academicSubject}
                    onChange={handleIndustryToAcademicChange}
                    required
                  />
                  <input
                    name="academicSkypeId"
                    placeholder="Skype ID"
                    value={industryToAcademic.academicSkypeId}
                    onChange={handleIndustryToAcademicChange}
                  />
                </div>
                <button type="submit">Submit Academic Details</button>
              </form>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
