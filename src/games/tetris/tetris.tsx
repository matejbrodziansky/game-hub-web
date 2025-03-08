import React from 'react'
import { width, height, TETRIS_COLOR } from '../../constants/testris/tetrisConstants';
import useTetrisCanvasRendering from '../hooks/useTetrisCanvasRendering';

const Tetris = () => {
  const canvasRef = useTetrisCanvasRendering()

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-gradient-to-b from-gray-800 to-black border-8 border-gray-500 rounded-lg shadow-lg"
      />
    </div>
  )
}

export default Tetris;
