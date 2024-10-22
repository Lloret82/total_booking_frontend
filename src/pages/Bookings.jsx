import React, { useState, useEffect } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [
      {
        id: 1,
        boatName: "Sea Explorer",
        date: "2024-10-25",
        customerName: "John Doe",
        tourName: "Sunset Tour",
        departureDate: "2024-10-25",
        isAssigned: false
      },
      {
        id: 2,
        boatName: "Wave Rider",
        date: "2024-11-05",
        customerName: "Jane Smith",
        tourName: "Island Hopping",
        departureDate: "2024-11-05",
        isAssigned: false
      },
      {
        id: 3,
        boatName: "Ocean Breeze",
        date: "2024-11-15",
        customerName: "Michael Brown",
        tourName: "Deep Sea Adventure",
        departureDate: "2024-11-15",
        isAssigned: false
      }
    ];

    setBookings(storedBookings);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddBooking = () => {
    const newBooking = {
      id: bookings.length + 1,
      boatName: `New Boat Booking ${bookings.length + 1}`,
      date: "2024-12-01",
      customerName: "New Customer",
      tourName: "New Tour",
      departureDate: "2024-12-01",
      isAssigned: false
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    saveToLocalStorage('bookings', updatedBookings);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <button
        onClick={handleAddBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Booking
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`bg-white shadow-md rounded p-4 ${booking.isAssigned ? 'border-red-500 border-2' : ''}`}
          >
            <h3 className="font-bold text-lg">{booking.boatName}</h3>
            <p>Customer: {booking.customerName}</p>
            <p>Tour: {booking.tourName}</p>
            <p>Date: {booking.departureDate}</p>
            <p>Points: {booking.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
