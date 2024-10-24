import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications'); // Optional: remove from local storage if needed
  };

  // Update notifications whenever a booking is added or assigned
  useEffect(() => {
    const handleStorageChange = () => {
      const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const newNotifications = storedBookings
        .filter((booking) => booking.status === "To Assign" || booking.status === "Assigned")
        .map((booking) =>
          booking.status === "Assigned"
            ? `Booking assigned: ${booking.tourName}`
            : `New booking added: ${booking.tourName}`
        );

      setNotifications(newNotifications);
    };

    // Listen for changes in local storage
    window.addEventListener('storage', handleStorageChange);

    // Fetch initial notifications
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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

      {/* Notification Icon & Account Icon */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={toggleNotification} className="text-white">
            <FaBell size={30} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center opacity-75">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification, index) => (
                  <li key={index} className="p-3 hover:bg-gray-100">
                    {notification}
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="p-3 text-center text-gray-500">No notifications</li>
                )}
              </ul>
              {/* Clear Notifications Button */}
              <div className="p-3 text-center">
                <button
                  onClick={handleClearNotifications}
                  className="text-indigo-800 hover:text-indigo-600 font-semibold"
                >
                  Clear Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Icon */}
        <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <img src="/total_booking_frontend/assets/cl.png" alt="Account" className="h-8 w-8 rounded-full" />
        </button>
      </div>
    </header>
  );
}
