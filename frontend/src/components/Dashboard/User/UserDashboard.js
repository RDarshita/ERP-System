import React from "react";
import { Outlet } from "react-router-dom";
import "./CSS/UserDashboard.css";
import UserNavbar from "./UserComponents/UserNavbar.js";
import UserSidebar from "./UserComponents/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <UserNavbar userName="Student" />
      <div className="user-layout">
        <UserSidebar />
        <div className="user-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
        


