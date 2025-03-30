import React, { useCallback, useEffect, useRef, useState } from 'react'
import { width, height } from './constants/tetrisConstants';
import useTetrisCanvasRendering from './hooks/useTetrisCanvasRendering';
import useTetrisMovementLogic from './logic/useMovementLogic';
import useCollision from './logic/useCollision';
import { spawnRandomShape } from './utils/tetrisUtils';
import { useGridStateContext } from './context/GridStateContext';
import Controls from './controls/Controls'
import { MoveDirectionType } from './types/types';

const Tetris = () => {
  const { gridState, updateGridOnCollision } = useGridStateContext();
  const [currentShape, setCurrentShape] = useState(() => spawnRandomShape());
  const { canvasRef, renderCanvas, setPosition, position, resetPosition } = useTetrisCanvasRendering(currentShape);
  const { run, handleMove } = useTetrisMovementLogic()
  const { checkCollision } = useCollision()
  const gameLooRef = useRef<NodeJS.Timeout | null>(null)
  const positionRef = useRef(position);


  const updateGame = useCallback(() => {
    if (!checkCollision(positionRef.current, currentShape)) {
      run(setPosition);
    } else {
      updateGridOnCollision(currentShape, positionRef.current);
      resetPosition();
      setCurrentShape(spawnRandomShape());
    }
  }, [checkCollision, run, resetPosition, updateGridOnCollision, currentShape]);


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
