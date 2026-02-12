import React from "react";
import { Routes, Route } from "react-router-dom";

import Admissions from "./Admissions";
import Awards from "./Awards";
import Research from "./Research";
import Immersion from "./Immersion";
import Placement from "./Placement";
import Profile from "./profile";
import Donation from "./Donation";
import MOU from "./MOU";
import Membership from "./Membership";
import UserDashboard from "./UserDashboard";
import DashboardHome from "./DashboardHome";

import "./CSS/UserDashboard.css";

const User = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="awards" element={<Awards />} />
        <Route path="research" element={<Research />} />
        <Route path="immersion" element={<Immersion />} />
        <Route path="placement" element={<Placement />} />
        <Route path="profile" element={<Profile />} />
        <Route path="donation" element={<Donation />} />
        <Route path="mou" element={<MOU />} />
        <Route path="membership" element={<Membership />} />
      </Route>
    </Routes>
  );
};

export default User;






