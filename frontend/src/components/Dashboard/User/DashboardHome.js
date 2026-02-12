import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/DashboardHome.css";

const DashboardHome = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Backend data states
  const [admissions, setAdmissions] = useState([]);
  const [awards, setAwards] = useState([]);
  const [researches, setResearches] = useState([]);
  const [immersions, setImmersions] = useState([]);
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    fetch("https://backenderp-production-6374.up.railway.app/api/admissions")
      .then((res) => res.json())
      .then(setAdmissions)
      .catch(() => {});
    fetch("https://backenderp-production-6374.up.railway.app/api/awards")
      .then((res) => res.json())
      .then(setAwards)
      .catch(() => {});
    fetch("https://backenderp-production-6374.up.railway.app/api/research")
      .then((res) => res.json())
      .then(setResearches)
      .catch(() => {});
    fetch("https://backenderp-production-6374.up.railway.app/api/immersion")
      .then((res) => res.json())
      .then(setImmersions)
      .catch(() => {});
    fetch("https://backenderp-production-6374.up.railway.app/api/placement")
      .then((res) => res.json())
      .then(setPlacements)
      .catch(() => {});
  }, []);

  const statsData = [
    {
      title: "Admissions Assistance",
      value: admissions.length || 0,
      trend: "+12%",
      icon: "🎓",
      color: "#36b9cc",
      link: "/dashboard/user/admissions",
    },
    {
      title: "Awards & Recognition",
      value: awards.length || 0,
      trend: "+8%",
      icon: "🏆",
      color: "#4e73df",
      link: "/dashboard/user/awards",
    },
    {
      title: "Research Support",
      value: researches.length || 0,
      trend: "+15%",
      icon: "🔬",
      color: "#1cc88a",
      link: "/dashboard/user/research",
    },
    {
      title: "Industry Immersion",
      value: immersions.length > 0 ? "92%" : "0%",
      trend: "+5%",
      icon: "🤝",
      color: "#f6c23e",
      link: "/dashboard/user/immersion",
    },
    {
      title: "Placement Support",
      value: placements.length || 0,
      trend: "+18%",
      icon: "💼",
      color: "#1c3ec8",
      link: "/dashboard/user/placement",
    },
  ];

  const quickLinks = [
    { url: "/dashboard/user/profile", text: "My Profile", icon: "👤" },
    { url: "/dashboard/user/donation", text: "Donation", icon: "💰" },
    { url: "/dashboard/user/mou", text: "MOU", icon: "📄" },
    { url: "/dashboard/user/membership", text: "Membership", icon: "💳" },
  ];

  const recentActivity = [
    { text: "Upcoming Placement Drive", time: "In 1 day", type: "info" },
    { text: "Membership Expiring Soon", time: "In 2 days", type: "warning" },
    { text: "Attended Research Seminar", time: "Today", type: "success" },
    { text: "New Notice from Institute", time: "Just now", type: "info" },
  ];

  return (
    <div className="dashboard-home">
      {/* Hero Section */}
      <section className="dashboard-home__hero">
        <h1 className="dashboard-home__greeting">Welcome Back, Student!</h1>
        <p className="dashboard-home__subtitle">
          Here's what's happening with your academic journey today
        </p>
        <div className="dashboard-home__search">
          <span className="dashboard-home__search-icon">🔍</span>
          <input
            type="search"
            className="dashboard-home__search-input"
            placeholder="Search courses, tasks, or resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="dashboard-home__stats">
        {statsData.map((stat) => (
          <div
            key={stat.title}
            className="dashboard-home__stat-card"
            style={{ "--card-accent-color": stat.color }}
            onClick={() => navigate(stat.link)}
          >
            <div className="dashboard-home__stat-header">
              <div
                className="dashboard-home__stat-icon"
                style={{ background: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="dashboard-home__stat-trend">{stat.trend}</span>
            </div>
            <h3 className="dashboard-home__stat-title">{stat.title}</h3>
            <p className="dashboard-home__stat-value">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Content Grid */}
      <div className="dashboard-home__content">
        {/* Quick Links */}
        <section className="dashboard-home__quick-links">
          <h2 className="dashboard-home__section-title">Quick Actions</h2>
          <div className="dashboard-home__links-grid">
            {quickLinks.map((link) => (
              <Link
                key={link.text}
                to={link.url}
                className="dashboard-home__link-card"
              >
                <span className="dashboard-home__link-icon">{link.icon}</span>
                <span className="dashboard-home__link-text">{link.text}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-home__activity">
          <h2 className="dashboard-home__section-title">Recent Activity</h2>
          <ul className="dashboard-home__activity-list">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="dashboard-home__activity-item">
                <span
                  className={`dashboard-home__activity-dot dashboard-home__activity-dot--${item.type}`}
                />
                <div className="dashboard-home__activity-content">
                  <p className="dashboard-home__activity-text">{item.text}</p>
                  <span className="dashboard-home__activity-time">
                    {item.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
