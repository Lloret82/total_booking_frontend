import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-customDarkBlue text-white py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/total_booking_frontend/assets/logo.jpg" alt="Sail & Fun Logo" className="h-12 mr-4" />
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex space-x-8">
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-customDarkBlue text-white p-6 space-y-4 z-10 md:hidden">
          <Link to="/dashboard" className="block text-sm font-semibold hover:text-indigo-200" onClick={toggleMobileMenu}>
            Dashboard
          </Link>
          <Link to="/bookings" className="block text-sm font-semibold hover:text-indigo-200" onClick={toggleMobileMenu}>
            Bookings
          </Link>
          <Link to="/assignment" className="block text-sm font-semibold hover:text-indigo-200" onClick={toggleMobileMenu}>
            Booking Assignment
          </Link>
          <Link to="/boats" className="block text-sm font-semibold hover:text-indigo-200" onClick={toggleMobileMenu}>
            Boats
          </Link>
        </div>
      )}

      {/* Account Icon */}
      <div className="hidden md:block">
        <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <img src="/total_booking_frontend/assets/cl.png" alt="Account" className="h-8 w-8 rounded-full" />
        </button>
      </div>
    </header>
  );
}
