import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // <== Import this
import Dashboard from './pages/Dashboard';
import Threats from './pages/ThreatTable';
import Navbar from './components/Navbar'; // if you have a navbar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />         {/* ✅ Add this line */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/threats" element={<Threats />} />
      </Routes>
    </Router>
  );
}

export default App;
