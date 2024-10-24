import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoatDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boat, setBoat] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBoat, setEditBoat] = useState({});

  useEffect(() => {
    // Fetch the boat details from local storage
    const storedBoats = JSON.parse(localStorage.getItem('boats')) || [];
    const selectedBoat = storedBoats.find((b) => b.id === parseInt(id));
    if (selectedBoat) {
      setBoat(selectedBoat);
      setEditBoat(selectedBoat);
    }
  }, [id]);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedBoats = JSON.parse(localStorage.getItem('boats')).map((b) =>
      b.id === boat.id ? editBoat : b
    );
    saveToLocalStorage('boats', updatedBoats);
    setBoat(editBoat);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBoat((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditBoat(boat); // Revert changes
  };

  return (
    <div className="container mx-auto p-6">
      {boat ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {boat.image && (
            <img
              src={boat.image}
              alt={boat.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editBoat.name}
                onChange={handleChange}
                placeholder="Boat Name"
                className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
              />
              <input
                type="text"
                name="type"
                value={editBoat.type}
                onChange={handleChange}
                placeholder="Boat Type"
                className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
              />
              <input
                type="number"
                name="capacity"
                value={editBoat.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
              />
              <input
                type="text"
                name="location"
                value={editBoat.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-customDarkBlue">{boat.name}</h2>
              <p className="text-gray-700">Type: {boat.type}</p>
              <p className="text-gray-700">Capacity: {boat.capacity}</p>
              <p className="text-gray-700">Location: {boat.location}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleEditClick}
                  className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Boat not found.</p>
      )}
    </div>
  );
};

export default BoatDetails;
