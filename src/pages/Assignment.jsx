import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import DraggableBooking from '../components/DraggableBooking';
import DroppableBoat from '../components/DroppableBoat';
import dummyBookings from '../data/dummyBookings.json';
import dummyBoats from '../data/dummyBoats.json';

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
        draggedBooking.status = "Assigned";
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingId ? draggedBooking : booking
        );
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
      if (draggedBooking && draggedBooking.isAssigned) {
        draggedBooking.isAssigned = false;
        draggedBooking.status = "To Assign";
        const updatedBookings = bookings.map((booking) =>
          booking.id === bookingId ? draggedBooking : booking
        );
        const updatedBoats = boats.map((boat) => ({
          ...boat,
          assignedBookings: boat.id === sourceBoatId
            ? boat.assignedBookings.filter((booking) => booking.id !== bookingId)
            : boat.assignedBookings,
        }));

        setBookings(updatedBookings);
        setBoats(updatedBoats);
        saveToLocalStorage('bookings', updatedBookings);
        saveToLocalStorage('boats', updatedBoats);
      }
    }
  };

  const handleGeneratePDFs = async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    for (const boat of boats) {
      if (boat.assignedBookings.length > 0) {
        const doc = new jsPDF();
        doc.text(`Boat: ${boat.name}`, 10, 10);
        doc.autoTable({
          head: [['Tour Name', 'Customer', 'Date']],
          body: boat.assignedBookings.map((booking) => [
            booking.tourName,
            booking.customerName,
            booking.departureDate,
          ]),
        });
  
        const fileName = `${boat.name} - ${currentDate}.pdf`;
        await new Promise((resolve) => {
          doc.save(fileName);
          setTimeout(resolve, 500);
        });
      }
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!filterDate) return !booking.isAssigned;
    return booking.departureDate === filterDate && !booking.isAssigned;
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
        className={`bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all ${isOver ? 'bg-gray-200' : ''}`}
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
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DroppableBookings />
        <div className="relative">
          <button
            onClick={handleGeneratePDFs}
            className="absolute top-0 right-0 bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Generate Documentation
          </button>
          <div className="grid grid-cols-1 gap-4 mt-12">
            {boats.map((boat) => (
              <DroppableBoat key={boat.id} boat={boat} onDropBooking={handleDropBooking} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Assignment;
