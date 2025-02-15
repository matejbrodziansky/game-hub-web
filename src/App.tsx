import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Snake from './games/snake/snake';



const App: React.FC = () => {

  return (
    <Router>
      <nav>
        <Link to="/snake">Snake</Link>
      </nav>
      <Routes>
        <Route path="/snake" element={<Snake />} />
      </Routes>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </Router>
  );
}

export default App;
