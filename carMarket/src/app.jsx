import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HighlightedCars from './components/HighlightedCars';
import './App.css';

function App() {
  return (
	
	  <Routes >
		<Route path="/" element={<Dashboard />} />
		<Route path="/highlighted" element={<HighlightedCars />} />
	  </Routes>
	
  );
}

export default App;