import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Placement.css";

export default function Placement() {
  const navigate = useNavigate();

  /* ===================== STATE ===================== */
  const [placements, setPlacements] = useState([]);
  const [studentRegistered, setStudentRegistered] = useState(false);

  // Student form
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    passingYear: "",
  });

  // Placement team form
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    role: "",
    location: "",
    salary: "",
    dateOfPlacement: "",
  });

  const getDefaultPlacements = () => [
    {
      id: 1,
      companyName: "Aurora Systems",
      role: "Data Analyst",
      location: "Bengaluru",
      salary: "8.2 LPA",
      dateOfPlacement: "2026-02-18T11:00"
    },
    {
      id: 2,
      companyName: "KiteWorks",
      role: "Frontend Engineer",
      location: "Hyderabad",
      salary: "10.5 LPA",
      dateOfPlacement: "2026-02-25T10:30"
    },
    {
      id: 3,
      companyName: "NovaBridge",
      role: "Product Associate",
      location: "Pune",
      salary: "7.4 LPA",
      dateOfPlacement: "2026-03-02T14:00"
    }
  ];

  /* ===================== FETCH EXISTING PLACEMENTS ===================== */
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/placement")
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) && data.length > 0 ? data : getDefaultPlacements();
        setPlacements(safeData);
      })
      .catch(() => setPlacements(getDefaultPlacements()));
  }, []);

  /* ===================== HANDLERS ===================== */
  const handleStudentChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
  };

  const submitStudentForm = (e) => {
    e.preventDefault();
    setStudentRegistered(true);
    alert("Student registered successfully!");
  };

  const submitCompanyForm = (e) => {
    e.preventDefault();

    const newPlacement = {
      ...companyForm,
      id: Date.now(),
    };

    setPlacements([...placements, newPlacement]);
    alert("Company added successfully!");

    setCompanyForm({
      companyName: "",
      role: "",
      location: "",
      salary: "",
      dateOfPlacement: "",
    });
  };

  const formatDateTime = (value) => {
    if (!value) return "TBD";
    return new Date(value).toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const nextInterview = useMemo(() => {
    const now = new Date();
    const upcoming = placements
      .filter((item) => item.dateOfPlacement && new Date(item.dateOfPlacement) > now)
      .sort((a, b) => new Date(a.dateOfPlacement) - new Date(b.dateOfPlacement));
    return upcoming[0] || null;
  }, [placements]);

  const stats = useMemo(() => {
    const total = placements.length;
    const upcoming = placements.filter((item) => item.dateOfPlacement && new Date(item.dateOfPlacement) > new Date())
      .length;
    const locations = new Set(placements.map((item) => item.location).filter(Boolean));
    return [
      { label: "Active Drives", value: total },
      { label: "Upcoming Interviews", value: upcoming },
      { label: "Locations", value: locations.size || 0 },
      { label: "Registered", value: studentRegistered ? "Yes" : "No" }
    ];
  }, [placements, studentRegistered]);

  const scrollToRegistration = () => {
    const target = document.getElementById("placement-registration");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="placement-page">
      <section className="placement-hero">
        <div className="placement-hero__left">
          <div className="placement-hero__top">
            <span className="placement-hero__eyebrow">Placement Command</span>
            <button className="placement-back-btn" onClick={() => navigate(-1)}>
              Back to Dashboard
            </button>
          </div>
          <h1>Career Placement Hub</h1>
          <p>
            A focused command center for placements, interview timelines, and recruiter updates. Register once to unlock
            the full opportunities feed.
          </p>
          <div className="placement-hero__cta">
            <button className="placement-btn placement-btn--primary" type="button" onClick={scrollToRegistration}>
              Start Registration
            </button>
            <button className="placement-btn placement-btn--ghost" type="button">
              View Placement Guide
            </button>
          </div>
        </div>
        <div className="placement-hero__right">
          <div className="placement-scoreboard">
            <h3>Placement Snapshot</h3>
            <div className="placement-scoreboard__grid">
              {stats.map((stat) => (
                <div key={stat.label} className="placement-score">
                  <p>{stat.label}</p>
                  <h4>{stat.value}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="placement-highlight">
            <p>Next Interview Window</p>
            <h4>{nextInterview ? formatDateTime(nextInterview.dateOfPlacement) : "To be announced"}</h4>
            <span>{nextInterview ? nextInterview.companyName : "Awaiting confirmed schedule"}</span>
          </div>
        </div>
      </section>

      <section className="placement-rail">
        <div className="placement-rail__step active">
          <span>1</span>
          <p>Register</p>
        </div>
        <div className="placement-rail__step">
          <span>2</span>
          <p>Profile Review</p>
        </div>
        <div className="placement-rail__step">
          <span>3</span>
          <p>Shortlist</p>
        </div>
        <div className="placement-rail__step">
          <span>4</span>
          <p>Interview</p>
        </div>
        <div className="placement-rail__step">
          <span>5</span>
          <p>Offer</p>
        </div>
      </section>

      <main className="placement-body">
        <section className="placement-column placement-column--main">
          <section id="placement-registration" className="placement-panel placement-panel--register">
            <div className="placement-panel__header">
              <div>
                <h2>Student Registration</h2>
                <p>One-time registration to unlock the placement board.</p>
              </div>
              <span className={`placement-status ${studentRegistered ? "active" : ""}`}>
                {studentRegistered ? "Registered" : "Locked"}
              </span>
            </div>

            {!studentRegistered ? (
              <form onSubmit={submitStudentForm} className="placement-form-grid">
                <input name="name" placeholder="Full Name" onChange={handleStudentChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleStudentChange} required />
                <input name="phone" placeholder="Phone Number" onChange={handleStudentChange} required />
                <input name="college" placeholder="College Name" onChange={handleStudentChange} required />
                <input name="degree" placeholder="Degree / Branch" onChange={handleStudentChange} required />
                <input name="passingYear" placeholder="Passing Year" onChange={handleStudentChange} required />
                <button className="placement-btn placement-btn--primary" type="submit">
                  Register & View Placements
                </button>
              </form>
            ) : (
              <div className="placement-registered">
                <h3>Registration complete</h3>
                <p>Placement board unlocked. Stay ready for recruiter updates and interview schedules.</p>
              </div>
            )}
          </section>

          {studentRegistered && (
            <section className="placement-panel placement-panel--opportunities">
              <div className="placement-panel__header">
                <div>
                  <h2>Placement Board</h2>
                  <p>Live roles and interview schedules.</p>
                </div>
                <span className="placement-tag">{placements.length} active drives</span>
              </div>

              <div className="placement-info-row">
                <div>
                  <p>Next interview</p>
                  <h4>{nextInterview ? formatDateTime(nextInterview.dateOfPlacement) : "To be announced"}</h4>
                </div>
                <div>
                  <p>Coordinator</p>
                  <h4>Mr. Rajesh Singh</h4>
                </div>
                <div>
                  <p>Support</p>
                  <h4>placements@campus.edu</h4>
                </div>
              </div>

              <div className="placement-list">
                {placements.length > 0 ? (
                  placements.map((p) => (
                    <article key={p.id} className="placement-card">
                      <div className="placement-card__top">
                        <div>
                          <h3>{p.companyName}</h3>
                          <p>{p.role}</p>
                        </div>
                        <span className="placement-card__badge">{p.location}</span>
                      </div>
                      <div className="placement-card__meta">
                        <span>Salary: {p.salary || "As per company norms"}</span>
                        <span>Date: {formatDateTime(p.dateOfPlacement)}</span>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="placement-empty">
                    <h3>No placements added</h3>
                    <p>Placement team will publish roles soon.</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </section>

        <aside className="placement-column placement-column--side">
          <section className="placement-panel placement-panel--company">
            <div className="placement-panel__header">
              <div>
                <h2>Placement Team</h2>
                <p>Add confirmed recruiter drives.</p>
              </div>
              <span className="placement-tag">Internal</span>
            </div>
            <form onSubmit={submitCompanyForm} className="placement-form-grid">
              <input name="companyName" placeholder="Company Name" value={companyForm.companyName} onChange={handleCompanyChange} required />
              <input name="role" placeholder="Job Role" value={companyForm.role} onChange={handleCompanyChange} required />
              <input name="location" placeholder="Location" value={companyForm.location} onChange={handleCompanyChange} required />
              <input name="salary" placeholder="CTC / Salary" value={companyForm.salary} onChange={handleCompanyChange} />
              <input name="dateOfPlacement" type="datetime-local" value={companyForm.dateOfPlacement} onChange={handleCompanyChange} required />
              <button className="placement-btn placement-btn--primary" type="submit">
                Add Placement
              </button>
            </form>
          </section>

          <section className="placement-panel placement-panel--insights">
            <h2>Readiness Checklist</h2>
            <ul>
              <li>Resume reviewed and updated</li>
              <li>Mock interview completed</li>
              <li>Portfolio link submitted</li>
              <li>Placement guidelines acknowledged</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
