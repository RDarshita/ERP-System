import React, { useState, useEffect } from "react";
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

  /* ===================== FETCH EXISTING PLACEMENTS ===================== */
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/placement")
      .then((res) => res.json())
      .then((data) => setPlacements(data))
      .catch(() => console.log("API not reachable"));
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

  const latestPlacement =
    placements.length > 0 ? placements[placements.length - 1] : null;

  /* ===================== UI ===================== */
  return (
    <div className="placement-page">
      {/* ===================== HEADER ===================== */}
      <header className="placement-header">
        <div className="placement-header-top">
          <h1>🎓 Placement Support</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          Student registration is mandatory to view placement opportunities.
        </p>
      </header>

      <main className="placement-content">
        {/* ===================== STUDENT REGISTRATION ===================== */}
        {!studentRegistered && (
          <section className="placement-form">
            <h2>🧑‍🎓 Student Registration Form</h2>
            <form onSubmit={submitStudentForm}>
              <input name="name" placeholder="Full Name" onChange={handleStudentChange} required />
              <input name="email" type="email" placeholder="Email" onChange={handleStudentChange} required />
              <input name="phone" placeholder="Phone Number" onChange={handleStudentChange} required />
              <input name="college" placeholder="College Name" onChange={handleStudentChange} required />
              <input name="degree" placeholder="Degree / Branch" onChange={handleStudentChange} required />
              <input name="passingYear" placeholder="Passing Year" onChange={handleStudentChange} required />
              <button className="placement-btn" type="submit">
                Register & View Placements
              </button>
            </form>
          </section>
        )}

        {/* ===================== PLACEMENT TEAM PANEL ===================== */}
        <section className="placement-form">
          <h2>🏢 Placement Team – Add Company</h2>
          <form onSubmit={submitCompanyForm}>
            <input name="companyName" placeholder="Company Name" value={companyForm.companyName} onChange={handleCompanyChange} required />
            <input name="role" placeholder="Job Role" value={companyForm.role} onChange={handleCompanyChange} required />
            <input name="location" placeholder="Location" value={companyForm.location} onChange={handleCompanyChange} required />
            <input name="salary" placeholder="CTC / Salary" value={companyForm.salary} onChange={handleCompanyChange} />
            <input name="dateOfPlacement" type="datetime-local" value={companyForm.dateOfPlacement} onChange={handleCompanyChange} required />
            <button className="placement-btn" type="submit">
              Add Placement
            </button>
          </form>
        </section>

        {/* ===================== PLACEMENTS LIST (VISIBLE ONLY AFTER STUDENT REG) ===================== */}
        {studentRegistered && (
          <section className="placement-info">
            <h2>📢 Available Placements</h2>

            <ul>
              <li>✅ {placements.length} Companies Shortlisted</li>
              <li>
                🕒 Next Interview:{" "}
                {latestPlacement
                  ? new Date(latestPlacement.dateOfPlacement).toLocaleString()
                  : "To be announced"}
              </li>
              <li>👨‍💼 Placement Coordinator: Mr. Rajesh Singh</li>
            </ul>

            <div className="placement-list">
              {placements.map((p, index) => (
                <div key={index} className="placement-card">
                  <h3>{p.companyName}</h3>
                  <p><strong>Role:</strong> {p.role}</p>
                  <p><strong>Location:</strong> {p.location}</p>
                  <p><strong>Salary:</strong> {p.salary || "As per company norms"}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(p.dateOfPlacement).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
