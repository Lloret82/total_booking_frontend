import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableBooking from './DraggableBooking';

const DroppableBoat = ({ boat, onDropBooking }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'BOOKING',
    drop: (item) => onDropBooking(item.id, boat.id, true, item.sourceBoatId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-customDarkBlue text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all mb-6 ${isOver ? 'bg-blue-300' : ''}`}
    >
      <div className="flex items-center mb-4">
        <img src={boat.logo || "./assets/boat.jpg.webp"} alt="Boat Logo" className="h-12 w-12 rounded-full mr-4" />
        <h2 className="text-xl font-bold">{boat.name}</h2>
      </div>
      <p className="text-sm">Type: {boat.type}</p>
      <p className="text-sm">Capacity: {boat.capacity}</p>
      <p className="text-sm">Location: {boat.location}</p>
      <h3 className="font-bold mt-4">Assigned Bookings:</h3>
      <div className="mt-2">
        {boat.assignedBookings.length === 0 ? (
          <p className="italic text-sm">No bookings assigned.</p>
        ) : (
          boat.assignedBookings.map((booking) => (
            <DraggableBooking key={booking.id} booking={booking} isAssigned={true} sourceBoatId={boat.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default DroppableBoat;
