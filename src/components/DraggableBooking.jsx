import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableBooking = ({ booking, isAssigned, sourceBoatId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOOKING',
    item: { id: booking.id, isAssigned, sourceBoatId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-all flex items-center ${isDragging ? 'opacity-50' : ''} ${isAssigned ? 'bg-green-50 border-l-4 border-green-400' : ''}`}
    >
      {/* Tour Image */}
      <img src={booking.logo || "./assets/boat.jpg.webp"} alt="Tour Logo" className="h-12 w-12 rounded-full mr-4" />
      <div>
        <h3 className="font-bold text-lg">{booking.tourName}</h3>
        <p className="text-gray-600">Customer: {booking.customerName}</p>
        <p className="text-gray-600">Date: {booking.departureDate}</p>
        <p className="text-gray-600">Points: {booking.points}</p>
      </div>
    </div>
  );
};

export default DraggableBooking;
