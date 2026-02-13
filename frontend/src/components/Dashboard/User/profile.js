import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [form, setForm] = useState({
    name: "",
    email: "",
    membershipStatus: "",
    phone: "",
    bio: "",
    location: "",
    organization: ""
  });

  // Simulate getting current userId from localStorage or auth context
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch profile from backend on mount
  useEffect(() => {
    document.body.classList.add("profile-transition");
    const timer = window.setTimeout(() => {
      document.body.classList.remove("profile-transition");
    }, 700);

    if (userId) {
      fetch(`https://backenderp-production-6374.up.railway.app/api/profile/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Profile not found");
          return res.json();
        })
        .then(data => {
          setProfile(data);
          setForm({
            name: data.userId?.name || "",
            email: data.userId?.email || "",
            membershipStatus: data.membershipStatus || "Active",
            phone: data.phone || "",
            bio: data.bio || "",
            location: data.location || "",
            organization: data.organization || ""
          });
        })
        .catch(() => setProfile(null));
    }

      return () => window.clearTimeout(timer);
  }, [userId]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    fetch(`https://backenderp-production-6374.up.railway.app/api/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(updatedProfile => {
        setProfile(updatedProfile);
        setEditing(false);
      })
      .catch(() => alert("Failed to update profile"));
  };

  const stats = [
    { label: "Memberships", value: "3", icon: "🎫" },
    { label: "Events Attended", value: "12", icon: "📅" },
    { label: "Certifications", value: "5", icon: "🏆" },
    { label: "Network", value: "48", icon: "👥" }
  ];

  const activities = [
    { title: "Updated Profile", date: "2 days ago", type: "profile" },
    { title: "Attended Workshop", date: "1 week ago", type: "event" },
    { title: "Renewed Membership", date: "2 weeks ago", type: "membership" },
    { title: "Completed Course", date: "1 month ago", type: "achievement" }
  ];

  if (!profile && !editing)
    return (
      <div className="profile-page user-profile-page">
        <div className="profile-not-found">
          <h2>Profile not found</h2>
          <button className="btn-primary" onClick={() => navigate('/dashboard/user')}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );

  return (
    <div className="profile-page user-profile-page">
      {/* Back Button */}
      <button className="back-to-dashboard-profile" onClick={() => navigate('/dashboard/user')}>
        <span className="back-arrow">←</span>
        <span>Back</span>
      </button>

      {/* Profile Header / Hero Section */}
      <div className="profile-hero">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <span className="avatar-text">
                {form.name ? form.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div className="profile-hero-info">
              <h1>{form.name || "User"}</h1>
              <p className="profile-email">{form.email}</p>
              <div className="profile-badges">
                <span className={`badge badge-${form.membershipStatus?.toLowerCase()}`}>
                  {form.membershipStatus || "Active"}
                </span>
                <span className="badge badge-verified">✓ Verified</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            {!editing ? (
              <button className="btn-edit" onClick={() => setEditing(true)}>
                ✏ Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSave}>
                  ✓ Save Changes
                </button>
                <button className="btn-cancel" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
        <button
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === "overview" && (
          <div className="overview-section">
            <div className="info-grid">
              {/* Personal Information */}
              <div className="info-card">
                <h3>Personal Information</h3>
                {editing ? (
                  <div className="form-group-profile">
                    <label>Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    <label>Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      type="email"
                    />
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                    <label>Location</label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                ) : (
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Name:</span>
                      <span className="info-value">{form.name || "Not set"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{form.email || "Not set"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{form.phone || "Not set"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{form.location || "Not set"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Information */}
              <div className="info-card">
                <h3>Professional Details</h3>
                {editing ? (
                  <div className="form-group-profile">
                    <label>Organization</label>
                    <input
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="Your organization"
                    />
                    <label>Membership Status</label>
                    <select
                      name="membershipStatus"
                      value={form.membershipStatus}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      rows="4"
                    />
                  </div>
                ) : (
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Organization:</span>
                      <span className="info-value">{form.organization || "Not set"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Membership:</span>
                      <span className="info-value">{form.membershipStatus || "Active"}</span>
                    </div>
                    <div className="info-item bio-item">
                      <span className="info-label">Bio:</span>
                      <p className="info-value">{form.bio || "No bio added yet"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-timeline">
              {activities.map((activity, idx) => (
                <div key={idx} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === "profile" && "👤"}
                    {activity.type === "event" && "📅"}
                    {activity.type === "membership" && "🎫"}
                    {activity.type === "achievement" && "🏆"}
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <h3>Account Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates about your account</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Profile Visibility</h4>
                  <p>Make your profile visible to others</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
