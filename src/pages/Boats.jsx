import React, { useState, useEffect } from 'react';

const Boats = () => {
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    // Load boats from local storage or fallback to dummy data
    const storedBoats = JSON.parse(localStorage.getItem('boats')) || [
      {
        id: 1,
        name: "Sea Explorer",
        type: "Yacht",
        capacity: 10,
        location: "Miami, FL",
        assignedBookings: []
      },
      {
        id: 2,
        name: "Wave Rider",
        type: "Speedboat",
        capacity: 6,
        location: "Key West, FL",
        assignedBookings: []
      },
      {
        id: 3,
        name: "Ocean Breeze",
        type: "Catamaran",
        capacity: 15,
        location: "Fort Lauderdale, FL",
        assignedBookings: []
      }
    ];

    setBoats(storedBoats);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddBoat = () => {
    const newBoat = {
      id: boats.length + 1,
      name: `New Boat ${boats.length + 1}`,
      type: "Fishing Boat",
      capacity: 8,
      location: "Orlando, FL",
      assignedBookings: []
    };

    const updatedBoats = [...boats, newBoat];
    setBoats(updatedBoats);
    saveToLocalStorage('boats', updatedBoats);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Boats</h1>
      <button
        onClick={handleAddBoat}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Add Boat
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boats.map((boat) => (
          <div key={boat.id} className="bg-white shadow-md rounded p-4">
            <h3 className="font-bold text-lg">{boat.name}</h3>
            <p>Type: {boat.type}</p>
            <p>Capacity: {boat.capacity}</p>
            <p>Location: {boat.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boats;
