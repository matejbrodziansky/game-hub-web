import React, { useEffect } from 'react'
import { width, height } from '../../constants/testris/tetrisConstants';
import useTetrisCanvasRendering from '../hooks/useTetrisCanvasRendering';


import {
  L_LEFT_SHAPE_OFFSETS,
  L_MIRRORED_SHAPE_OFFSETS,
  SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
  T_SHAPE_OFFSETS,
  I_SHAPE_OFFSETS
} from '../../constants/testris/tetrisShapes';

const Tetris = () => {
  const { canvasRef, renderCanvas,setPosition } = useTetrisCanvasRendering();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => ({
        x: prevPosition.x,
        y: prevPosition.y + 1,
      }))
    }, 1000)

    return () => clearInterval(interval);
  },[setPosition])

  useEffect(() => {
    renderCanvas(T_SHAPE_OFFSETS);
  }, [renderCanvas]);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="bg-gradient-to-b from-gray-800 to-black border-8 border-gray-500 rounded-lg shadow-lg"
      />
    </div>
  );
}

export default Tetris;
