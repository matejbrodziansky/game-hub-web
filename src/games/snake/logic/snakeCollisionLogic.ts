import { useState, useEffect, useMemo, useCallback } from 'react';
import { SnakeSegment } from '../types/snakeTypes';
import { width, height } from '../constants/snakeConstants';

const useSnakeCollisionLogic = (snake: SnakeSegment[]) => {
  const [collision, setCollision] = useState(false);
  const snakeHead = snake[0];

  const snakePositions = useMemo(() => {
    const set = new Set<string>();
    for (let i = 1; i < snake.length; i++) {
      set.add(`${snake[i].x},${snake[i].y}`);
    }
    return set;
  }, [snake]);

  const checkCollision = useCallback((): boolean => {
    if (!snakeHead) return false;

    const wallCollision =
      snakeHead.x < 0 ||
      snakeHead.x >= width ||
      snakeHead.y < 0 ||
      snakeHead.y >= height;

    const selfCollision = snakePositions.has(`${snakeHead.x},${snakeHead.y}`);

    return wallCollision || selfCollision;
  }, [snakeHead, snakePositions]);

  const resetCollision = () => {
    setCollision(false);
  };

  useEffect(() => {
    if (checkCollision()) setCollision(true);
  }, [snakeHead, snakePositions, checkCollision]);

  return {
    collision,
    resetCollision,
  };
};

export default useSnakeCollisionLogic;
