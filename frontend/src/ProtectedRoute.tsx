import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};
