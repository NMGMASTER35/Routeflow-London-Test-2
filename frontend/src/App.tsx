import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FleetPage from './pages/FleetPage';
import BusProfilePage from './pages/BusProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FleetPage />} />
        <Route path="/bus/:reg" element={<BusProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
