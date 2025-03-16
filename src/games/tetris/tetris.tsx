import React, { useCallback, useEffect, useRef, useState } from 'react'
import { width, height } from './constants/tetrisConstants';
import useTetrisCanvasRendering from './hooks/useTetrisCanvasRendering';
import useTetrisMovementLogic from './logic/useMovementLogic';

import {
  L_LEFT_SHAPE_OFFSETS,
  L_MIRRORED_SHAPE_OFFSETS,
  SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
  T_SHAPE_OFFSETS,
  I_SHAPE_OFFSETS
} from './constants/tetrisShapes';
import useCollision from './logic/useCollision';
import { spawnRandomShape } from './utils/tetrisUtils';

const Tetris = () => {
  const { canvasRef, renderCanvas, setPosition, position } = useTetrisCanvasRendering();
  const { move } = useTetrisMovementLogic()
  const { checkCollision } = useCollision()
  const [currentShape, setCurrentShape] = useState(() => spawnRandomShape());
  const gameLooRef = useRef<NodeJS.Timeout | null>(null)


  const updateGame = useCallback(() => {
    if (!checkCollision(position, currentShape)) {

      move(setPosition)
    } else {
      console.log('collision');
      // setCurrentShape(spawnRandomShape());
      return
    }

  }, [checkCollision, setPosition, move, position])

  useEffect(() => {
    gameLooRef.current = setInterval(updateGame, 500)

    return () => {
      if (gameLooRef.current) clearInterval(gameLooRef.current)
    }
  }, [updateGame]);


  useEffect(() => {
    renderCanvas(currentShape);
  }, [renderCanvas, position, currentShape]);

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
