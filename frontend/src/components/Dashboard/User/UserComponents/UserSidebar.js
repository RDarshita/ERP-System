import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/UserSidebar.css";

const sidebarLinks = [
  { label: "Dashboard", to: "/dashboard/user", icon: "🏠" },
  { label: "Admission Assistance", to: "/dashboard/user/admissions", icon: "🎓" },
  { label: "Research Support", to: "/dashboard/user/research", icon: "🔬" },
  { label: "Immersion", to: "/dashboard/user/immersion", icon: "🤝" },
  { label: "Placement", to: "/dashboard/user/placement", icon: "💼" },
  { label: "Awards", to: "/dashboard/user/awards", icon: "🏅" },
  { label: "Donation", to: "/dashboard/user/donation", icon: "💝", mobileOnly: true },
  { label: "MOU", to: "/dashboard/user/mou", icon: "📄", mobileOnly: true },
  { label: "Membership", to: "/dashboard/user/membership", icon: "🪪", mobileOnly: true },
];

const UserSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 700px)").matches;
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.href = "/";
  };

  return (
    <>
      <button
        type="button"
        className={`user-sidebar__floating-toggle ${isCollapsed ? "is-visible" : ""}`}
        onClick={() => setIsCollapsed(false)}
        aria-label="Open sidebar"
      >
        ☰
      </button>
      <div
        className={`user-sidebar__backdrop ${isCollapsed ? "" : "is-visible"}`}
        onClick={() => setIsCollapsed(true)}
        aria-hidden="true"
      />
      <aside className={`user-sidebar ${isCollapsed ? "is-collapsed" : ""}`}>
        <button
          type="button"
          className="user-sidebar__toggle"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "»" : "«"}
        </button>

        <div className="user-sidebar__title">Navigation</div>

        <div className="user-sidebar__scroll">
          <nav className="user-sidebar__nav">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`user-sidebar__link ${link.mobileOnly ? "is-mobile-only" : ""}`}
              >
                <span className="user-sidebar__icon" aria-hidden="true">
                  {link.icon}
                </span>
                <span className="user-sidebar__label">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button type="button" className="user-sidebar__logout" onClick={handleLogout}>
          <span className="user-sidebar__icon" aria-hidden="true">
            🚪
          </span>
          <span className="user-sidebar__label">Logout</span>
        </button>
      </aside>
    </>
  );
};

export default UserSidebar;