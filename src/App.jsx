import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Assignment from "./pages/Assignment";
import Boats from "./pages/Boats";
import BookingDetails from './pages/BookingDetail';
import { NotificationProvider } from './contexts/NotificationContext';
import BoatDetails from "./pages/BoatDetails";



function App() {
  return (
    <Router key={window.location.pathname}>
    <NotificationProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/boats" element={<Boats />} />
        <Route path="/booking-details/:id" element={<BookingDetails />} />
        <Route path="/boats/:id" element={<BoatDetails />} />

      </Routes>
     </NotificationProvider>
    </Router>
    

  );
}


export default App;
