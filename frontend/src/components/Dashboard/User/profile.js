import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    membershipStatus: ""
  });

  // Simulate getting current userId from localStorage or auth context
  const userId = JSON.parse(localStorage.getItem("user"))?.id; // changed from _id to id

  // Fetch profile from backend on mount
  useEffect(() => {
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
            membershipStatus: data.membershipStatus || "Active"
          });
        })
        .catch(() => setProfile(null));
    }
  }, [userId]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    fetch(`https://backenderp-production-6374.up.railway.app/api/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ membershipStatus: form.membershipStatus }),
    })
      .then(res => res.json())
      .then(updatedProfile => {
        setProfile(updatedProfile);
        setEditing(false);
      })
      .catch(() => alert("Failed to update profile"));
  };

  if (!profile && !editing)
    return (
      <div className="page-container">
        <h2>Profile not found</h2>
        <button onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    );

  return (
    <div className="page-container">
      <header className="profile-header">
        <h2>👤 My Profile</h2>
        <p>Manage your personal details, update contact info, and view your profile summary.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back to Dashboard
        </button>
      </header>

      <main className="profile-content">
        {editing ? (
          <>
            <label>Name: <input name="name" value={form.name} disabled /></label>
            <label>Email: <input name="email" value={form.email} disabled /></label>
            <label>
              Membership Status:
              <select name="membershipStatus" value={form.membershipStatus} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <div className="profile-card">
            <h4>Name: {form.name}</h4>
            <p>Email: {form.email}</p>
            <p>Membership: {profile.membershipStatus || "Active"}</p>
            <button className="edit-btn" onClick={() => setEditing(true)}>✏ Edit Profile</button>
          </div>
        )}
      </main>
    </div>
  );
}
