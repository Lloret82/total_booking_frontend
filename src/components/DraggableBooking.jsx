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

  const cardClass = isAssigned 
    ? 'p-2 bg-green-100 text-black rounded shadow-sm w-28'
    : 'bg-white p-4 rounded-lg shadow-md hover:shadow-lg mb-2 transition-all flex items-center';

  return (
    <div
      ref={drag}
      className={`${cardClass} ${isDragging ? 'opacity-50' : ''}`}
    >
      {isAssigned ? (
        <div>
          <h3 className="font-bold text-sm">{booking.tourName}</h3>
          <p className="text-xs">{booking.customerName}</p>
        </div>
      ) : (
        <>
          <img src={booking.logo || "./assets/boat.jpg.webp"} alt="Tour Logo" className="h-8 w-8 rounded-full mr-2" />
          <div>
            <h3 className="font-bold">{booking.tourName}</h3>
            <p className="text-gray-600">Customer: {booking.customerName}</p>
            <p className="text-gray-600">Date: {booking.departureDate}</p>
            <p className="text-gray-600">Points: {booking.points}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableBooking;
