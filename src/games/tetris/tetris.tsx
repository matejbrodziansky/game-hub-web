import React, { useCallback, useEffect, useRef, useState } from 'react'
import { width, height } from './constants/tetrisConstants';
import useTetrisCanvasRendering from './hooks/useTetrisCanvasRendering';
import useCollision from './logic/useCollision';
import { useGridStateContext } from './context/GridStateContext';
import Controls from './controls/Controls'
import { MoveDirectionType } from './types/types';
import { useMovementContext } from './context/MovementContext';
import { useShapeContext } from './context/ShapeContext';

const Tetris = () => {
  const { gridState, updateGridOnCollision } = useGridStateContext();
  const { currentShape, spawnNewShape } = useShapeContext();
  const { canvasRef, renderCanvas, setPosition, position, resetPosition } = useTetrisCanvasRendering(currentShape);
  const { checkCollision } = useCollision()
  const { handleMove, run } = useMovementContext();
  const gameLooRef = useRef<NodeJS.Timeout | null>(null)
  const updateGame = useCallback(() => {
    if (!checkCollision(currentShape)) {
      run();
    } else {
      updateGridOnCollision(currentShape, position); // TODO PREMYSLIeť
      resetPosition();
      spawnNewShape()
    }
  }, [checkCollision, run, resetPosition, updateGridOnCollision, currentShape, position, spawnNewShape]);


  useEffect(() => {
    gameLooRef.current = setInterval(updateGame, 200)

    return () => {
      if (gameLooRef.current) clearInterval(gameLooRef.current)
    }
  }, [updateGame]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas, position, currentShape, gridState]);

  const moveHandler = (direction: MoveDirectionType) => {
    handleMove(direction, setPosition);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      marginTop: '15px'
    }}>

      {/* HEADER: SCORE + PAUSE */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        maxWidth: '600px',
        marginBottom: '10px'
      }}>
        <p className="font-bold text-xl text-white bg-orange-500 px-4 py-2 rounded-md shadow-lg">
          Your Score: 0
          {/* {score} */}
        </p>
      </div>

      {/* MAIN CONTENT - CANVAS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="bg-gradient-to-b from-gray-800 to-black border-8 border-gray-500 rounded-lg shadow-lg"
        />
      </div>

      {/* CONTROLS + GAME OVER */}
      <div style={{ marginTop: '10px' }}>
        <Controls handleMove={moveHandler} />
      </div>
    </div>

  );
}

export default Tetris;
