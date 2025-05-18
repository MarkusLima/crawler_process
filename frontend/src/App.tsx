// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Kanban from "./pages/kanban";
import { isAuthenticated } from "./auth";
import { ProtectedRoute } from "./ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/kanban" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kanban" element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
