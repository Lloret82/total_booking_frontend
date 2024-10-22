import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-customDarkBlue text-white py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/total_booking_frontend/assets/logo.jpg" alt="Sail & Fun Logo" className="h-12 mr-4" />
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <Link to="/dashboard" className="text-sm font-semibold hover:text-indigo-200">
          Dashboard
        </Link>
        <Link to="/bookings" className="text-sm font-semibold hover:text-indigo-200">
          Bookings
        </Link>
        <Link to="/assignment" className="text-sm font-semibold hover:text-indigo-200">
          Booking Assignment
        </Link>
        <Link to="/boats" className="text-sm font-semibold hover:text-indigo-200">
          Boats
        </Link>
      </nav>

      {/* Account Icon */}
      <div>
        <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <img src="/total_booking_frontend/assets/cl.png" alt="Account" className="h-8 w-8 rounded-full" />
        </button>
      </div>
    </header>
  );
}
