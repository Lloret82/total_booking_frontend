import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure you have this import
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Assignment from "./pages/Assignment";
import Boats from "./pages/Boats";

function App() {
  return (
    <Router>
      {/* Render the Navbar at the top */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/boats" element={<Boats />} />
      </Routes>
    </Router>
  );
}

export default App;
