import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Boats = () => {
  const [boats, setBoats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoat, setNewBoat] = useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedBoats = JSON.parse(localStorage.getItem('boats')) || [
      {
        id: 1,
        name: "Sea Explorer",
        type: "Yacht",
        capacity: 10,
        location: "Miami, FL",
        image: "./assets/boat.jpg.webp",
      },
    ];
    setBoats(storedBoats);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleAddBoat = () => {
    setIsModalOpen(true);
  };

  const handleSaveBoat = () => {
    const updatedBoat = {
      ...newBoat,
      id: boats.length + 1,
    };
    const updatedBoats = [...boats, updatedBoat];
    setBoats(updatedBoats);
    saveToLocalStorage('boats', updatedBoats);
    setIsModalOpen(false);
    setNewBoat({
      name: "",
      type: "",
      capacity: "",
      location: "",
      image: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBoat((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBoat((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-6 lg:px-8">
        <section>
          <h1 className="text-2xl font-bold mb-8">Boats</h1>
          <button
            onClick={handleAddBoat}
            className="bg-customDarkBlue text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition mb-8"
          >
            Add Boat
          </button>
        </section>

        {/* Modal for Adding a New Boat */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-2/3 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-customDarkBlue">Add New Boat</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newBoat.name}
                  onChange={handleChange}
                  placeholder="Boat Name"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="type"
                  value={newBoat.type}
                  onChange={handleChange}
                  placeholder="Boat Type"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="number"
                  name="capacity"
                  value={newBoat.capacity}
                  onChange={handleChange}
                  placeholder="Capacity"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="text"
                  name="location"
                  value={newBoat.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBoat}
                  className="bg-indigo-800 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Displaying the Boats as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boats.map((boat) => (
            <div
              key={boat.id}
              onClick={() => navigate(`/boats/${boat.id}`)}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
            >
              {boat.image && (
                <img
                  src={boat.image}
                  alt={boat.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-bold text-lg text-customDarkBlue">{boat.name}</h3>
              <p className="text-gray-700">Type: {boat.type}</p>
              <p className="text-gray-700">Capacity: {boat.capacity}</p>
              <p className="text-gray-700">Location: {boat.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boats;
