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
        price: "$2000",
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
      date: "12/08/2025",
      customerName: "John Smith",
      tourName: "New Tour",
      departureDate: "12/08/2025",
      duration: "4 hours",
      capacity: "25 people",
      location: "Harbor D",
      price: "$180",
      status: "To Assign",
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

       {/* Header Row - Hidden on small screens */}
<div className="hidden md:block bg-white p-4 rounded-lg shadow mb-2">
  <div className="grid grid-cols-10 items-center gap-4 font-semibold text-gray-700 pl-8"> {/* Adjusted padding */}
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
                className="md:grid md:grid-cols-10 md:items-center md:py-4 md:rounded-lg hover:bg-gray-100 transition bg-white mb-6"
              >
                {/* Mobile Card Layout */}
                <div className="block md:hidden bg-gray-50 p-4 rounded-lg shadow mb-4">
                  <div className="flex items-center mb-2">
                    <img src={booking.logo} alt="Boat Logo" className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-700">{booking.tourName}</h3>
                      <p className="text-gray-600">{booking.customerName}</p>
                    </div>
                  </div>
                  <p><strong>Date:</strong> {booking.departureDate}</p>
                  <p><strong>Duration:</strong> {booking.duration}</p>
                  <p><strong>Capacity:</strong> {booking.capacity}</p>
                  <p><strong>Location:</strong> {booking.location}</p>
                  <p><strong>Price:</strong> {booking.price}</p>
                  <p className={`font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : booking.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{booking.status}</p>
                  <button className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition mt-4">
                    View Details
                  </button>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex justify-center">
                  <img src={booking.logo} alt="Boat Logo" className="h-12 w-12 rounded-full" />
                </div>
                <div className="hidden md:block text-center">
                  <h3 className="font-semibold text-gray-700">{booking.tourName}</h3>
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
                  <p className={`font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : booking.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{booking.status}</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <button className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
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
