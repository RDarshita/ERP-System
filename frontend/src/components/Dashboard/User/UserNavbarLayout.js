import React from "react";
import { Outlet } from "react-router-dom";
import "./CSS/UserDashboard.css";
import UserNavbar from "./UserComponents/UserNavbar";

const UserNavbarLayout = () => {
  return (
    <div className="user-dashboard">
      <UserNavbar userName="Student" />
      <div className="user-layout user-layout--full">
        <div className="user-content user-content--full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserNavbarLayout;
