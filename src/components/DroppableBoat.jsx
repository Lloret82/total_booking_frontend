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
      className={`bg-customDarkBlue text-white p-4 rounded shadow-md hover:shadow-lg transition-all ${
        isOver ? 'bg-blue-200' : ''
      }`}
    >
      <div className="flex items-start">
        {/* Add the image on the left */}
        <img
          src={boat.logo || "./assets/boat.jpg.webp"}
          alt="Boat Logo"
          className="h-12 w-12 rounded-full mr-4"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{boat.name}</h2>
          <p className="text-sm">{boat.type}</p>
          <p className="text-sm">Capacity: {boat.capacity}</p>
          <p className="text-sm">Location: {boat.location}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 ml-4">
          {boat.assignedBookings.map((booking) => (
            <DraggableBooking key={booking.id} booking={booking} isAssigned={true} sourceBoatId={boat.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DroppableBoat;
