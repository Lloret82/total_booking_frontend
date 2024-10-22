import React, { useState, useEffect } from 'react';
import dummyBookings from '../data/dummyBookings.json';

const BookingGrid = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(dummyBookings);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white shadow-md rounded p-4">
            <h3 className="font-bold text-lg">{booking.boatName}</h3>
            <p>Date: {booking.date}</p>
            <p>Customer: {booking.customerName}</p>
            <p>Tour: {booking.tourName}</p>
            <p>Points: {booking.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingGrid;
