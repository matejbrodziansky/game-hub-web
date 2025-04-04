import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Snake from './games/snake/snake';
import Tetris from './games/tetris/tetris';
import { GridStateProvider } from './games/tetris/context/GridStateContext';
import { MovementProvider } from './games/tetris/context/MovementContext';
import { ShapeProvider } from './games/tetris/context/ShapeContext';




const App: React.FC = () => {

  return (
    <Router>
      <nav>
        <Link to="/snake">Snake</Link>
        <Link to="/tetris">Tetris</Link>
      </nav>
      <Routes>
        <Route path="/snake" element={<Snake />} />
        <Route
          path="/tetris"
          element={
            <ShapeProvider>
              <GridStateProvider>
                <MovementProvider>
                  <Tetris />
                </MovementProvider>
              </GridStateProvider>
            </ShapeProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


