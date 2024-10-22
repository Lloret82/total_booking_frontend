import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dummyBookings from '../data/dummyBookings.json';
import dummyBoats from '../data/dummyBoats.json';

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
      className={`bg-white p-4 rounded shadow-md mb-2 ${isDragging ? 'opacity-50' : ''} ${isAssigned ? 'bg-gray-200' : ''}`}
    >
      <h3 className="font-bold text-lg">{booking.boatName}</h3>
      <p>Customer: {booking.customerName}</p>
      <p>Tour: {booking.tourName}</p>
      <p>Date: {booking.departureDate}</p>
      <p>Points: {booking.points}</p>
    </div>
  );
};

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
      className={`bg-blue-100 p-4 rounded shadow-md ${isOver ? 'bg-blue-200' : ''}`}
    >
      <h2 className="text-xl font-bold mb-4">{boat.name}</h2>
      <p>Type: {boat.type}</p>
      <p>Capacity: {boat.capacity}</p>
      <p>Location: {boat.location}</p>
      <h3 className="font-bold mt-4">Assigned Bookings:</h3>
      {boat.assignedBookings.map((booking) => (
        <DraggableBooking key={booking.id} booking={booking} isAssigned={true} sourceBoatId={boat.id} />
      ))}
    </div>
  );
};

const Assignment = () => {
  const [bookings, setBookings] = useState([]);
  const [boats, setBoats] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || dummyBookings;
    const storedBoats = JSON.parse(localStorage.getItem('boats')) || dummyBoats.map((boat) => ({
      ...boat,
      assignedBookings: [],
    }));

    setBookings(storedBookings);
    setBoats(storedBoats);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleDropBooking = (bookingId, boatId, isAssigning, sourceBoatId = null) => {
    const draggedBooking = bookings.find((booking) => booking.id === bookingId) ||
                           boats.flatMap(boat => boat.assignedBookings).find(booking => booking.id === bookingId);

    if (isAssigning) {
      if (draggedBooking && !draggedBooking.isAssigned) {
        draggedBooking.isAssigned = true;
        const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
        const updatedBoats = boats.map((boat) => {
          if (boat.id === boatId) {
            return {
              ...boat,
              assignedBookings: [...boat.assignedBookings, draggedBooking],
            };
          }
          return boat;
        });

        setBookings(updatedBookings);
        setBoats(updatedBoats);
        saveToLocalStorage('bookings', updatedBookings);
        saveToLocalStorage('boats', updatedBoats);
      }
    } else {
      let updatedBoats = boats;
      if (sourceBoatId) {
        updatedBoats = boats.map((boat) => ({
          ...boat,
          assignedBookings: boat.id === sourceBoatId
            ? boat.assignedBookings.filter((booking) => booking.id !== bookingId)
            : boat.assignedBookings,
        }));
      }

      draggedBooking.isAssigned = false;
      const updatedBookings = [...bookings, draggedBooking];
      setBookings(updatedBookings);
      setBoats(updatedBoats);
      saveToLocalStorage('bookings', updatedBookings);
      saveToLocalStorage('boats', updatedBoats);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!filterDate) return true;
    return booking.departureDate === filterDate;
  });

  const DroppableBookings = () => {
    const [{ isOver }, drop] = useDrop({
      accept: 'BOOKING',
      drop: (item) => handleDropBooking(item.id, null, false, item.sourceBoatId),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`bg-gray-100 p-4 rounded shadow-md ${isOver ? 'bg-gray-200' : ''}`}
      >
        <h2 className="text-xl font-bold mb-4">Bookings</h2>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 mb-4 w-full border rounded"
          placeholder="Filter by departure date"
        />
        {filteredBookings.map((booking) => (
          <DraggableBooking key={booking.id} booking={booking} isAssigned={false} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
        <DroppableBookings />
        <div className="grid grid-cols-1 gap-4">
          {boats.map((boat) => (
            <DroppableBoat key={boat.id} boat={boat} onDropBooking={handleDropBooking} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Assignment;
