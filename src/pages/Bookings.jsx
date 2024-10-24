import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    boatName: "",
    customerName: "",
    tourName: "",
    departureDate: "",
    duration: "",
    capacity: "",
    location: "",
    price: "",
    status: "To Assign",
    logo: "./assets/512x512-2.avif",
    isAssigned: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [
      {
        id: 1,
        boatName: "Sea Explorer",
        date: "2024-10-25",
        customerName: "John Doe",
        tourName: "Sunset Tour",
        departureDate: "2024-10-25",
        isAssigned: false,
        points: "0.8",
        duration: "3 hours",
        capacity: "30",
        location: "Harbor A",
        price: "$2000",
        status: "Confirmed",
        logo: "./assets/512x512-2.avif"
      }
    ];
    setBookings(storedBookings);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddBooking = () => {
    setIsModalOpen(true);
  };

  const handleSaveBooking = () => {
    const updatedBooking = {
      ...newBooking,
      id: bookings.length + 1,
    };
    const updatedBookings = [...bookings, updatedBooking];
    setBookings(updatedBookings);
    saveToLocalStorage('bookings', updatedBookings);
    setIsModalOpen(false);
    setNewBooking({
      boatName: "",
      customerName: "",
      tourName: "",
      departureDate: "",
      duration: "",
      capacity: "",
      location: "",
      price: "",
      status: "To Assign",
      logo: "./assets/512x512-2.avif",
      isAssigned: false
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (id) => {
    navigate(`/booking-details/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-6 lg:px-8">
        <section>
          <h1 className="text-2xl font-bold mb-8">Bookings</h1>
          <button
            onClick={handleAddBooking}
            className="bg-customDarkBlue text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition mb-8"
          >
            Add Booking
          </button>
        </section>

        {/* Enhanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-2/3 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-customDarkBlue">Add New Booking</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="boatName"
                  value={newBooking.boatName}
                  onChange={handleChange}
                  placeholder="Boat Name"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="customerName"
                  value={newBooking.customerName}
                  onChange={handleChange}
                  placeholder="Customer Name"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="tourName"
                  value={newBooking.tourName}
                  onChange={handleChange}
                  placeholder="Tour Name"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="date"
                  name="departureDate"
                  value={newBooking.departureDate}
                  onChange={handleChange}
                  placeholder="Departure Date"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="duration"
                  value={newBooking.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="number"
                  name="capacity"
                  value={newBooking.capacity}
                  onChange={handleChange}
                  placeholder="Capacity"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="location"
                  value={newBooking.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="price"
                  value={newBooking.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBooking}
                  className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:block bg-white p-4 rounded-lg shadow mb-2">
          <div className="grid grid-cols-10 items-center gap-4 font-semibold text-gray-700 pl-8">
            <p></p>
            <p>Tour Name</p>
            <p>Customer</p>
            <p>Date</p>
            <p>Duration</p>
            <p>N. People</p>
            <p>Location</p>
            <p>Price</p>
            <p>Status</p>
            <p></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className={`md:grid md:grid-cols-10 items-center py-4 hover:bg-gray-100 transition rounded-lg shadow-md mb-6 flex flex-col md:flex-row ${booking.status === 'Assigned' ? 'bg-green-100' : 'bg-white'}`}
              >
                <div className="flex justify-center mb-2 md:mb-0">
                  <img src={booking.logo} alt="Boat Logo" className="h-12 w-12 rounded-full" />
                </div>
                <div className="text-center md:text-left mb-2 md:mb-0">
                  <h3 className="font-semibold text-gray-700">{booking.tourName}</h3>
                </div>
                <div className="text-center md:hidden">
                  <p className="text-gray-600">{booking.departureDate}</p>
                </div>
                <div className="text-center md:hidden">
                  <p className="text-gray-600">{booking.customerName}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.customerName}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.departureDate}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.duration}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.capacity}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.location}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600">{booking.price}</p>
                </div>
                <div className="hidden md:block text-center">
                  <p className={`font-semibold ${booking.status === 'Assigned' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</p>
                </div>
                <div className="ml-4 flex justify-center md:justify-end">
                  <button
                    onClick={() => handleViewDetails(booking.id)}
                    className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
