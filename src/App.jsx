import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Boats from './pages/Boats';
import Dashboard from './pages/Dashboard';
import Assignment from './pages/Assignment'; // Import Assignment component
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/boats" element={<Boats />} />
        <Route path="/assignment" element={<Assignment />} /> {/* New route for Assignment */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
