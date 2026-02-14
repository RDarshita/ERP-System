import React from "react";
import { Link } from "react-router-dom";
import "../CSS/UserNavbr.css";
import logo from "../../../image/logoSAHFON.webp";

const UserNavbar = ({ userName = "Student" }) => {
  const initials = userName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleProfileClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    document.documentElement.style.setProperty("--profile-origin-x", `${originX}px`);
    document.documentElement.style.setProperty("--profile-origin-y", `${originY}px`);
    document.body.classList.add("profile-transition");

    window.setTimeout(() => {
      document.body.classList.remove("profile-transition");
    }, 700);
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar__left">
        <img src={logo} alt="Saathaihum Foundation" className="user-navbar__logo-img" />
        <div className="user-navbar__brand">
          <span className="user-navbar__logo">Saathaihum</span>
          <span className="user-navbar__tag">Foundation</span>
        </div>
      </div>

      <div className="user-navbar__center">
        <Link to="/dashboard/user/donation" className="user-navbar__link">
          Donation
        </Link>
        <Link to="/dashboard/user/mou" className="user-navbar__link">
          MOU
        </Link>
        <Link to="/dashboard/user/membership" className="user-navbar__link">
          Membership
        </Link>
      </div>

      <div className="user-navbar__right">
        <Link
          to="/dashboard/user/profile"
          className="user-navbar__profile"
          aria-label={`Profile ${userName}`}
          onClick={handleProfileClick}
        >
          <span className="user-navbar__initials">{initials || "U"}</span>
          <span className="user-navbar__status" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
};

export default UserNavbar;