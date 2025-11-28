import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeancePage from './pages/SeancePage';
import LearnPage from './pages/LearnPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SeancePage />} />
      <Route path="/learn" element={<LearnPage />} />
    </Routes>
  );
}

export default App;
