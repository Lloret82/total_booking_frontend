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
        isAssigned: false,
        points: "0.8",
        duration: "3 hours",
        capacity: "30 people",
        location: "Harbor A",
        price: "$150",
        status: "Confirmed",
        logo: "./assets/cl.png"
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
      duration: "4 hours",
      capacity: "25 people",
      location: "Harbor D",
      price: "$180",
      status: "Confirmed",
      logo: "./assets/cl.png"
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    saveToLocalStorage('bookings', updatedBookings);
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

        {/* Header Row - Only visible on larger screens */}
        <div className="hidden md:grid bg-white p-4 rounded-lg shadow mb-2">
          <div className="grid grid-cols-10 items-center gap-4 font-semibold text-gray-700 pl-16">
            <p></p> {/* Placeholder for image */}
            <p>Tour Name</p>
            <p>Customer</p>
            <p>Date</p>
            <p>Duration</p>
            <p>Capacity</p>
            <p>Location</p>
            <p>Price</p>
            <p>Status</p>
            <p></p> {/* Placeholder for button */}
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="grid md:grid-cols-10 sm:grid-cols-5 grid-cols-1 items-center py-4 hover:bg-gray-100 transition rounded-lg shadow-md bg-white mb-6"
              >
                {/* Booking Details */}
                <div className="flex justify-center">
                  <img src={booking.logo} alt="Boat Logo" className="h-12 w-12 rounded-full" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-700">{booking.tourName}</h3>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-gray-600">{booking.customerName}</p>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-gray-600">{booking.departureDate}</p>
                </div>
                <div className="text-center hidden md:block">
                  <p className="text-gray-600">{booking.duration}</p>
                </div>
                <div className="text-center hidden md:block">
                  <p className="text-gray-600">{booking.capacity}</p>
                </div>
                <div className="text-center hidden lg:block">
                  <p className="text-gray-600">{booking.location}</p>
                </div>
                <div className="text-center hidden lg:block">
                  <p className="text-gray-600">{booking.price}</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : booking.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{booking.status}</p>
                </div>

                {/* View Details Button */}
                <div className="ml-4 flex justify-center">
                  <button className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition whitespace-nowrap">
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