import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({});

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const foundBooking = storedBookings.find((b) => b.id === parseInt(id));
    if (foundBooking) {
      setBooking(foundBooking);
      setEditedBooking(foundBooking);
    } else {
      navigate('/bookings'); // Redirect if booking not found
    }
  }, [id, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = storedBookings.map((b) =>
      b.id === parseInt(id) ? editedBooking : b
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBooking(editedBooking);
    setIsEditing(false);
    window.dispatchEvent(new Event('storage')); // To update in other components if needed
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">Booking Details</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <img src={booking.logo} alt="Boat Logo" className="h-16 w-16 rounded-full mr-4" />
              <h2 className="text-xl font-semibold">{booking.tourName}</h2>
            </div>

            <div className="mt-4">
              <p><strong>Boat Name:</strong> {isEditing ? <input type="text" name="boatName" value={editedBooking.boatName} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.boatName}</p>
              <p><strong>Customer:</strong> {isEditing ? <input type="text" name="customerName" value={editedBooking.customerName} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.customerName}</p>
              <p><strong>Tour Name:</strong> {isEditing ? <input type="text" name="tourName" value={editedBooking.tourName} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.tourName}</p>
              <p><strong>Departure Date:</strong> {isEditing ? <input type="date" name="departureDate" value={editedBooking.departureDate} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.departureDate}</p>
              <p><strong>Duration:</strong> {isEditing ? <input type="text" name="duration" value={editedBooking.duration} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.duration}</p>
              <p><strong>Capacity:</strong> {isEditing ? <input type="number" name="capacity" value={editedBooking.capacity} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.capacity}</p>
              <p><strong>Location:</strong> {isEditing ? <input type="text" name="location" value={editedBooking.location} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.location}</p>
              <p><strong>Price:</strong> {isEditing ? <input type="text" name="price" value={editedBooking.price} onChange={handleChange} className="border p-2 rounded w-full"/> : booking.price}</p>
              <p><strong>Status:</strong> {isEditing ? <select name="status" value={editedBooking.status} onChange={handleChange} className="border p-2 rounded w-full">
                <option value="To Assign">To Assign</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Assigned">Assigned</option>
              </select> : booking.status}</p>
            </div>

            <div className="flex justify-end mt-6">
              {isEditing ? (
                <button onClick={handleSave} className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                  Save
                </button>
              ) : (
                <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
