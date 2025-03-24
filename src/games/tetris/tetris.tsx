import React, { useCallback, useEffect, useRef, useState } from 'react'
import { width, height } from './constants/tetrisConstants';
import useTetrisCanvasRendering from './hooks/useTetrisCanvasRendering';
import useTetrisMovementLogic from './logic/useMovementLogic';
import useCollision from './logic/useCollision';
import { spawnRandomShape } from './utils/tetrisUtils';
import useGridState from './hooks/useGridState';

const Tetris = () => {
  const { canvasRef, renderCanvas, setPosition, position, resetPosition, setGridState } = useTetrisCanvasRendering();
  const { move } = useTetrisMovementLogic()
  const { checkCollision } = useCollision()
  const [currentShape, setCurrentShape] = useState(() => spawnRandomShape());
  const gameLooRef = useRef<NodeJS.Timeout | null>(null)
  const { updateGridOnCollision, gridState } = useGridState()


  const updateGame = useCallback(() => {
    if (!checkCollision(position, currentShape)) {
      move(setPosition);
    } else {
      updateGridOnCollision(currentShape, position)
      resetPosition();
      setCurrentShape(spawnRandomShape());
      return;
    }
  }, [checkCollision, setPosition, move, position, currentShape, resetPosition, updateGridOnCollision]);


  useEffect(() => {
    gameLooRef.current = setInterval(updateGame, 200)

    return () => {
      if (gameLooRef.current) clearInterval(gameLooRef.current)
    }
  }, [updateGame]);


  useEffect(() => {
    setGridState(gridState)
    renderCanvas(currentShape);
  }, [renderCanvas, position, currentShape, gridState, setGridState]);



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
