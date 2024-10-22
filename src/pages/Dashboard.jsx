export default function Dashboard() {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-6 lg:px-8">
         
  
          {/* Overview Section */}
          <section>
            <h1 className="text-2xl font-bold mb-8">Overview</h1>
            {/* First Row of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Total Bookings</h3>
                <p className="text-4xl font-bold">263</p>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Today's Bookings</h3>
                <p className="text-4xl font-bold">63</p>
                <button className="mt-4 bg-indigo-800 py-1 px-4 rounded-full hover:bg-indigo-700 transition">View all</button>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Bookings to Assign</h3>
                <p className="text-4xl font-bold">190</p>
                <button className="mt-4 bg-indigo-800 py-1 px-4 rounded-full hover:bg-indigo-700 transition">View all</button>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Booking Value</h3>
                <p className="text-4xl font-bold">€380,500</p>
              </div>
            </div>
  
            {/* Second Row of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Completed Bookings</h3>
                <p className="text-4xl font-bold">185</p>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Pending Bookings</h3>
                <p className="text-4xl font-bold">25</p>
                <button className="mt-4 bg-indigo-800 py-1 px-4 rounded-full hover:bg-indigo-700 transition">View all</button>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Cancelled Bookings</h3>
                <p className="text-4xl font-bold">5</p>
                <button className="mt-4 bg-indigo-800 py-1 px-4 rounded-full hover:bg-indigo-700 transition">View all</button>
              </div>
              <div className="bg-customDarkBlue text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">No-show Bookings</h3>
                <p className="text-4xl font-bold">2</p>
              </div>
            </div>
          </section>
  
          {/* Bookings by Company & Feeder Section */}
          <section className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-8">Bookings by Company</h2>
                {/* First Row of Company Images */}
                <div className="grid grid-cols-5 gap-6 justify-items-center mb-6">
                  {[13, 10, 15, 11, 14].map((count, index) => (
                    <div key={index} className="text-center">
                      <img
                        src="/assets/cl.png"
                        alt="Company Avatar"
                        className="h-16 w-16 rounded-full mx-auto"
                      />
                      <p className="text-sm mt-2">Company</p>
                      <span className="block mt-1 font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
                {/* Second Row of Company Images */}
                <div className="grid grid-cols-5 gap-6 justify-items-center">
                  {[7, 9, 12, 8, 6].map((count, index) => (
                    <div key={index} className="text-center">
                      <img
                        src="/assets/cl.png"
                        alt="Company Avatar"
                        className="h-16 w-16 rounded-full mx-auto"
                      />
                      <p className="text-sm mt-2">Company</p>
                      <span className="block mt-1 font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Bookings by Feeder */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-8">Bookings by Feeder</h2>
                <div className="flex justify-center">
                  <img src="/assets/pie.png" alt="Bookings by Feeder Chart" />
                </div>
              </div>
            </div>
          </section>
  
          {/* Bookings Trend */}
          <section className="my-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-8">Bookings Trend</h2>
            <div className="flex justify-center">
              <img src="/assets/chart.png" alt="Bookings Trend Chart" />
            </div>
          </section>
        </div>
      </div>
    );
  }
  