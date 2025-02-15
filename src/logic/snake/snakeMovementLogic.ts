import React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react';
import { Direction, DirectionEnum } from '../../types/snake/snakeTypes';
import { GRID_SIZE, SNAKE_START_X, SNAKE_START_Y, SNAKE_SPEED } from '../../constants/snakeConstants';


const useSnakeMovementLogic = () => {
  // const testLongSnake = [
  //   { x: 160, y: 100 },
  //   { x: 140, y: 100 },
  //   { x: 120, y: 100 },
  //   { x: 100, y: 100 },
  //   { x: 80, y: 100 },
  //   { x: 60, y: 100 },
  //   { x: 40, y: 100 },
  //   { x: 20, y: 100 },
  //   { x: 0, y: 100 },
  // ]
  // const initialSnakePosition = testLongSnake;
  
  const initialSnakePosition = [{ x: SNAKE_START_X, y: SNAKE_START_Y }];
  const initialDirection = DirectionEnum.DOWN;

  const [snake, setSnake] = useState(initialSnakePosition);
  const [direction, setDirection] = React.useState<Direction>(initialDirection);
  const [snakeSpeed, setSnakeSpeed] = useState(SNAKE_SPEED)
  const speedUpIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const defaultSpeed = SNAKE_SPEED;

  const move = (direction: Direction, grow: boolean) => {

    const moves = {
      [DirectionEnum.UP]: { x: 0, y: -GRID_SIZE },
      [DirectionEnum.DOWN]: { x: 0, y: GRID_SIZE },
      [DirectionEnum.LEFT]: { x: -GRID_SIZE, y: 0 },
      [DirectionEnum.RIGHT]: { x: GRID_SIZE, y: 0 },
    };

    const newHead = {
      x: snake[0].x + moves[direction].x,
      y: snake[0].y + moves[direction].y
    }

    setSnake((prevSnake) =>
      grow ? [newHead, ...prevSnake] : [newHead, ...prevSnake.slice(0, -1)]
    );
  };

  const changeDirection = (newDirection: string) => {
    if (newDirection === DirectionEnum.LEFT && direction !== DirectionEnum.RIGHT) {
      setDirection(DirectionEnum.LEFT)
    }
    else if (newDirection === DirectionEnum.RIGHT && direction !== DirectionEnum.LEFT) {
      setDirection(DirectionEnum.RIGHT)
    }
    else if (newDirection === DirectionEnum.DOWN && direction !== DirectionEnum.UP) {
      setDirection(DirectionEnum.DOWN)
    }
    else if (newDirection === DirectionEnum.UP && direction !== DirectionEnum.DOWN) {
      setDirection(DirectionEnum.UP)
    }
  }
  const resetSnakePosition = () => {
    setSnake(initialSnakePosition)
  }

  const speedUp = () => {
    if (speedUpIntervalRef.current) return;

    speedUpIntervalRef.current = setInterval(() => {
      setSnakeSpeed(prevSpeed => Math.max(prevSpeed - 50, 50));
    }, 200);
  };

  const stopSpeedUp = useCallback(() => {
    if (speedUpIntervalRef.current) {
      clearInterval(speedUpIntervalRef.current);
      speedUpIntervalRef.current = null;
    }
    setSnakeSpeed(defaultSpeed);
  }, [defaultSpeed]);

  useEffect(() => {
    document.addEventListener("mouseup", stopSpeedUp);
    document.addEventListener("mouseleave", stopSpeedUp);
    document.addEventListener("touchend", stopSpeedUp);
    document.addEventListener("touchcancel", stopSpeedUp);

    return () => {
      document.removeEventListener("mouseup", stopSpeedUp);
      document.removeEventListener("mouseleave", stopSpeedUp);
      document.removeEventListener("touchend", stopSpeedUp);
      document.removeEventListener("touchcancel", stopSpeedUp);
    };
  }, [stopSpeedUp]);

  return (
    {
      snake,
      direction,
      move,
      changeDirection,
      resetSnakePosition,
      speedUp,
      snakeSpeed
    }
  )
}

export default useSnakeMovementLogic