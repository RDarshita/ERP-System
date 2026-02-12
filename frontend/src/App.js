import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import ForgotPassword from "./components/Login/ForgotPassword";

import Admin from "./components/Dashboard/admin/admin";
import UserDashboard from "./components/Dashboard/User/User";
import InstituteDashboard from "./components/Dashboard/institute/institute";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // ✅ CHANGE 1: Read user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const RoleRoute = ({ role, element }) => {
    if (!user) return <Navigate to="/" replace />;
    return user.role === role ? element : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* ✅ CHANGE 2: Use user.role directly to build dashboard path */}
        <Route
          path="/"
          element={
            user
              ? <Navigate to={`/dashboard/${user.role}`} replace />
              : <Login />
          }
        />

        {/* Auth Routes */}
        
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        <Route
          path="/dashboard/admin/*"
          element={<RoleRoute role="admin" element={<Admin />} />}
        />

        <Route
          path="/dashboard/institute/*"
          element={<RoleRoute role="institute" element={<InstituteDashboard />} />}
        />

        <Route
          path="/dashboard/user/*"
          // element={<RoleRoute role="user" element={<UserDashboard />} />}
          element={<UserDashboard />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
