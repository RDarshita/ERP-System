import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Admissions.css";

export default function Admissions() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  // Fetch from backend on mount
  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/admissions")
      .then(res => res.json())
      .then(data => {
        setAdmissions(data || getDefaultData());
        setFilteredAdmissions(data || getDefaultData());
      })
      .catch(() => {
        const defaultData = getDefaultData();
        setAdmissions(defaultData);
        setFilteredAdmissions(defaultData);
      });
  }, []);

  const getDefaultData = () => [
    {
      id: 1,
      name: "B.Tech Computer Science",
      course: "Undergraduate Program",
      date: "2025-06-15",
      deadline: "2025-05-30",
      seats: 120,
      status: "Open",
      icon: "💻",
      description: "4-year comprehensive engineering program with industry focus"
    },
    {
      id: 2,
      name: "M.Tech Data Science",
      course: "Postgraduate Program",
      date: "2025-07-20",
      deadline: "2025-07-10",
      seats: 45,
      status: "Open",
      icon: "📊",
      description: "Advanced specialization in Data Science and AI"
    },
    {
      id: 3,
      name: "MBA Executive",
      course: "Executive Program",
      date: "2025-08-01",
      deadline: "2025-07-15",
      seats: 50,
      status: "Open",
      icon: "📈",
      description: "Weekend/part-time MBA for working professionals"
    },
    {
      id: 4,
      name: "PhD Research",
      course: "Doctoral Program",
      date: "2025-09-01",
      deadline: "2025-08-20",
      seats: 30,
      status: "Coming Soon",
      icon: "🔬",
      description: "Doctoral research programs across multiple disciplines"
    }
  ];

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = admissions.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAdmissions(filtered);
  };

  // Handle filter
  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    if (filter === "all") {
      setFilteredAdmissions(admissions);
    } else {
      setFilteredAdmissions(admissions.filter(a => a.status === filter));
    }
  };

  const stats = [
    { label: "Open Programs", value: admissions.filter(a => a.status === "Open").length, icon: "📚", color: "#36b9cc" },
    { label: "Total Seats", value: admissions.reduce((acc, a) => acc + (a.seats || 0), 0), icon: "👥", color: "#4e73df" },
    { label: "Avg Seats/Program", value: Math.round(admissions.reduce((acc, a) => acc + (a.seats || 0), 0) / admissions.length), icon: "📊", color: "#1cc88a" },
    { label: "Success Rate", value: "87%", icon: "✨", color: "#f6c23e" }
  ];

  const getStatusColor = (status) => {
    return status === "Open" ? "#3bd671" : status === "Coming Soon" ? "#f6c23e" : "#ff6b6b";
  };

  return (
    <div className="admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <div className="admissions-hero__content">
          <h1 className="admissions-hero__title">
            <span className="admissions-hero__icon">🎓</span>
            Admissions Assistance
          </h1>
          <p className="admissions-hero__subtitle">
            Explore our comprehensive admission programs and find the perfect fit for your academic journey
          </p>
        </div>
      </section>

      {/* Search Section */}
      <div className="admissions-search-wrapper">
        <div className="admissions-search-icon">🔍</div>
        <input
          type="text"
          className="admissions-search-input"
          placeholder="Search programs by name or course..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Stats Section */}
      <section className="admissions-stats">
        {stats.map((stat, idx) => (
          <div key={idx} className="admissions-stat-card" style={{ "--card-color": stat.color }}>
            <div className="admissions-stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="admissions-stat-info">
              <p className="admissions-stat-label">{stat.label}</p>
              <h3 className="admissions-stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Filter Section */}
      <div className="admissions-filters">
        <button
          className={`admissions-filter-btn ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All Programs
        </button>
        <button
          className={`admissions-filter-btn ${selectedFilter === "Open" ? "active" : ""}`}
          onClick={() => handleFilter("Open")}
        >
          Open
        </button>
        <button
          className={`admissions-filter-btn ${selectedFilter === "Coming Soon" ? "active" : ""}`}
          onClick={() => handleFilter("Coming Soon")}
        >
          Coming Soon
        </button>
      </div>

      {/* Programs Grid */}
      <section className="admissions-programs">
        {filteredAdmissions.length > 0 ? (
          filteredAdmissions.map((program, idx) => (
            <div
              key={program.id}
              className="admissions-card"
              style={{ "--delay": `${idx * 0.1}s` }}
              onClick={() => setExpandedCard(expandedCard === program.id ? null : program.id)}
            >
              <div className="admissions-card__header">
                <div className="admissions-card__icon">{program.icon}</div>
                <div className="admissions-card__title-block">
                  <h3 className="admissions-card__name">{program.name}</h3>
                  <p className="admissions-card__course">{program.course}</p>
                </div>
                <span className="admissions-card__status" style={{ "--status-color": getStatusColor(program.status) }}>
                  {program.status}
                </span>
              </div>

              <p className="admissions-card__description">{program.description}</p>

              <div className="admissions-card__meta">
                <div className="admissions-meta-item">
                  <span className="admissions-meta-icon">📅</span>
                  <div>
                    <p>Start Date</p>
                    <span>{new Date(program.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
                <div className="admissions-meta-item">
                  <span className="admissions-meta-icon">⏰</span>
                  <div>
                    <p>Deadline</p>
                    <span>{new Date(program.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
                <div className="admissions-meta-item">
                  <span className="admissions-meta-icon">👥</span>
                  <div>
                    <p>Seats</p>
                    <span>{program.seats}</span>
                  </div>
                </div>
              </div>

              <div className={`admissions-card__expanded ${expandedCard === program.id ? "active" : ""}`}>
                <h4>What's Included</h4>
                <ul>
                  <li>✓ Industry-standard curriculum</li>
                  <li>✓ Expert faculty mentorship</li>
                  <li>✓ Internship opportunities</li>
                  <li>✓ Career guidance & support</li>
                  <li>✓ Placement assistance</li>
                </ul>
              </div>

              <div className="admissions-card__actions">
                <button className="admissions-btn-primary">📝 Apply Now</button>
                <button className="admissions-btn-secondary">ℹ️ Details</button>
              </div>
            </div>
          ))
        ) : (
          <div className="admissions-empty">
            <div className="admissions-empty-icon">🔍</div>
            <h3>No programs found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </section>

      {/* Info Cards */}
      <section className="admissions-info-cards">
        <div className="admissions-info-card">
          <div className="admissions-info-icon">📋</div>
          <h3>Required Documents</h3>
          <p>Academic transcripts, entrance exam scores, and personal statement</p>
        </div>
        <div className="admissions-info-card">
          <div className="admissions-info-icon">💬</div>
          <h3>Need Help?</h3>
          <p>Contact our admissions team for guidance and support</p>
        </div>
        <div className="admissions-info-card">
          <div className="admissions-info-icon">🎯</div>
          <h3>Scholarships</h3>
          <p>Explore various scholarship opportunities and financial aid programs</p>
        </div>
      </section>
    </div>
  );
}

