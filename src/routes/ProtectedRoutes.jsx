import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Utility to get user info (email, role) from localStorage.
 * Returns { email, role } or null if not set.
 */
function getLocalUserInfo() {
  try {
    const raw = localStorage.getItem("userInfo");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Protect routes for authenticated users only.
 * Reads from localStorage, no props required.
 */
export const ProtectedRoute = ({ children }) => {
  const userInfo = getLocalUserInfo();
  const isAuthenticated = userInfo && userInfo.email;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

/**
 * Protect routes for admin users only.
 * Reads from localStorage, no props required.
 */
export const AdminRoute = ({ children }) => {
  const userInfo = getLocalUserInfo();
  const isAuthenticated = userInfo && userInfo.email;
  const userRole = userInfo && userInfo.role;

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (userRole === "loading") return <div>Loading...</div>;
  if (userRole !== "admin") return <Navigate to="/home" />;
  return children;
};