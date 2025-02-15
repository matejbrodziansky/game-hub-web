import React from 'react';
import { SnakeSegment } from '../../types/snake/snakeTypes';
import { width, height, GRID_SIZE } from '../../constants/snakeConstants';

const useSnakeFoodLogic = (snake: SnakeSegment[]) => {
const [isFoodOnBoard, setIsFoodOnBoard] = React.useState(false);
  const [foodPosition, setFoodPosition] = React.useState<{ x: number; y: number }>({ x: -1, y: -1 });
  const snakeHead = snake[0];

  const checkFoodColision = React.useCallback(() => {
    return foodPosition && foodPosition.x === snakeHead.x && foodPosition.y === snakeHead.y;
  }, [foodPosition, snakeHead]);

  const generateFood = React.useCallback((): { x: number; y: number } => {
    let position: SnakeSegment;
    const isPositionOnSnake = (pos: SnakeSegment) => snake.some(segment => segment.x === pos.x && segment.y === pos.y);
    do {
      position = {
        x: Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE,
        y: Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE,
      };
    } while (isPositionOnSnake(position));
    return position;
  }, [snake]);

  const spawnFood = React.useCallback(() => {
    setFoodPosition(generateFood());
    setIsFoodOnBoard(true);
  }, [generateFood]);

  return {
    spawnFood,
    checkFoodColision,
    foodPosition,
    isFoodOnBoard
  };
};

export default useSnakeFoodLogic;
