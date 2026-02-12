import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Immersion.css";

export default function Immersion() {
  const navigate = useNavigate();
  const [immersions, setImmersions] = useState([]);
  const [form, setForm] = useState({
    program: "",
    institution: "",
    startDate: "",
    endDate: "",
    description: ""
  });

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

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/immersion")
      .then(res => res.json())
      .then(setImmersions);
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://backenderp-production-6374.up.railway.app/api/immersion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newImmersion =>
        setImmersions(prev => [...prev, newImmersion])
      );
    setForm({
      program: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

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

  return (
    <div className="immersion-page">
      <header className="immersion-header">
        <div className="immersion-header-top">
          <h1>🏭 Academic–Industry Immersion</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Dashboard
          </button>
        </div>
        <p>
          Track your internships, industrial training, and professional exposure
          programs here.
        </p>

        {/* New Academic / Industry Fee Info */}
        <div className="immersion-fee-strip">
          <div className="fee-card academic">
            <h3>Academic Immersion</h3>
            <div className="fee-row">
              <span>Indian</span>
              <button
                type="button"
                className="link-button"
                onClick={goToDonation}
              >
                Donate For Good
              </button>
            </div>
            <div className="fee-row">
              <span>Non‑Indian</span>
              <button
                type="button"
                className="link-button"
                onClick={goToDonation}
              >
                Donate For Good
              </button>
            </div>

            {/* NEW: Form 1 – Industry applies here */}
            <form
              className="immersion-form small-form"
              onSubmit={handleAcademicToIndustrySubmit}
            >
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
              {/* label added here */}
              <label style={{ fontSize: "0.85rem" }}>Upload Resume</label>
              <input
                type="file"
                name="industryResume"
                accept=".pdf,.doc,.docx"
                onChange={handleIndustryResumeChange}
              />
              <button type="submit">Submit Industry Details</button>
            </form>
          </div>

          <div className="fee-card industry">
            <h3>Industry Immersion</h3>
            <div className="fee-row">
              <span>Indian</span>
              <button
                type="button"
                className="link-button"
                onClick={goToDonation}
              >
                Donate For Good
              </button>
            </div>
            <div className="fee-row">
              <span>Non‑Indian</span>
              <button
                type="button"
                className="link-button"
                onClick={goToDonation}
              >
                Donate For Good
              </button>
            </div>

            {/* NEW: Form 2 – Academic applies here */}
            <form
              className="immersion-form small-form"
              onSubmit={handleIndustryToAcademicSubmit}
            >
              <h4>Academic University (Register Here)</h4>
              <input
                name="academicName"
                placeholder="Name of University / Institute"
                value={industryToAcademic.academicName}
                onChange={handleIndustryToAcademicChange}
                required
              />
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
              <input
                name="academicLocation"
                placeholder="Location"
                value={industryToAcademic.academicLocation}
                onChange={handleIndustryToAcademicChange}
                required
              />
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
              <button type="submit">Submit Academic Details</button>
            </form>
          </div>
        </div>
      </header>

      <main className="immersion-content">
        <section className="immersion-progress">
          <h2>Current Immersion Status</h2>
          <ul>
            {immersions.length > 0 ? (
              immersions.map(item => (
                <li key={item.id}>
                  <strong>{item.program}</strong> at {item.institution} from{" "}
                  {item.startDate} to {item.endDate}
                  <br />
                  {item.description}
                </li>
              ))
            ) : (
              <>
                <li>📊 92% Completion</li>
                <li>🧠 Ongoing Project: Data Analytics at DeltaX Labs</li>
                <li>📅 Final Report Due: 20 Nov 2025</li>
              </>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
