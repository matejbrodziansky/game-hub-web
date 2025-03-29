import React, { useCallback, useEffect, useRef, useState } from 'react'
import { width, height } from './constants/tetrisConstants';
import useTetrisCanvasRendering from './hooks/useTetrisCanvasRendering';
import useTetrisMovementLogic from './logic/useMovementLogic';
import useCollision from './logic/useCollision';
import { spawnRandomShape } from './utils/tetrisUtils';
import { useGridStateContext } from './context/GridStateContext';

const Tetris = () => {
  const { gridState, updateGridOnCollision } = useGridStateContext();
  const [currentShape, setCurrentShape] = useState(() => spawnRandomShape());
  const { canvasRef, renderCanvas, setPosition, position, resetPosition } = useTetrisCanvasRendering(currentShape);
  const { move } = useTetrisMovementLogic()
  const { checkCollision } = useCollision()
  const gameLooRef = useRef<NodeJS.Timeout | null>(null)
  const positionRef = useRef(position);


  const updateGame = useCallback(() => {
    if (!checkCollision(positionRef.current, currentShape)) {
      move(setPosition);
    } else {
      updateGridOnCollision(currentShape, positionRef.current);
      resetPosition();
      setCurrentShape(spawnRandomShape());
    }
  }, [checkCollision, move, resetPosition, updateGridOnCollision, currentShape]);


  useEffect(() => {
    gameLooRef.current = setInterval(updateGame, 200)

    return () => {
      if (gameLooRef.current) clearInterval(gameLooRef.current)
    }
  }, [updateGame]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);


  useEffect(() => {
    renderCanvas();
  }, [renderCanvas, position, currentShape, gridState]);



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
