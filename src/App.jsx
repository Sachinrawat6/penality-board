import React from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMistake from './pages/AddMistake';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-mistake" element={<AddMistake />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
