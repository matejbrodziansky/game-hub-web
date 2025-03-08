import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Snake from './games/snake/snake';
import Tetris from './games/tetris/tetris';
import ParticlesCanvas from './components/ParticlesCanvas';




const App: React.FC = () => {

  return (
    <Router>
      {/* <ParticlesCanvas /> */}
      <nav>
        <Link to="/snake">Snake</Link>
        <Link to="/tetris">Tetris</Link>
      </nav>
      <Routes>
        <Route path="/snake" element={<Snake />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </Router>
  );
}

export default App;
