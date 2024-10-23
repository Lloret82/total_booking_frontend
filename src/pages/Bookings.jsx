import React, { useState, useEffect } from 'react';

const getRandomStatus = () => {
  const statuses = ["To Assign", "Pending", "Confirmed"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date(2025, 11, 31);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

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
    const newBooking = {
      id: bookings.length + 1,
      boatName: `Private Tour`,
      date: getRandomDate(),
      customerName: "John Smith",
      tourName: "Private Tour",
      departureDate: getRandomDate(),
      duration: "4 hours",
      capacity: "25",
      location: "Harbor D",
      price: "$180",
      status: getRandomStatus(),
      logo: "./assets/512x512-2.avif",
      isAssigned: false
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    saveToLocalStorage('bookings', updatedBookings);
    window.dispatchEvent(new Event('storage'));
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
