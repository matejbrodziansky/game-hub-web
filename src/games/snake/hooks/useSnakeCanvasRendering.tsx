import { useEffect, useRef } from 'react';
import { width, height, GRID_SIZE } from '../constants/snakeConstants';
import { SnakeSegment, Food } from '../types/snakeTypes';

const useSnakeCanvasRendering = (snake: SnakeSegment[], foodPosition: Food) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

        useEffect(() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {

                // Clear canvas
                ctx.clearRect(0, 0, width, height);

                // draw a grid
                ctx.strokeStyle = 'lightgray'; // TODO: color to constants
                for (let x = 0; x < width; x += GRID_SIZE) {
                  ctx.beginPath();
                  ctx.moveTo(x, 0);
                  ctx.lineTo(x, height);
                  ctx.stroke();
                }
                for (let y = 0; y < height; y += GRID_SIZE) {
                  ctx.beginPath();
                  ctx.moveTo(0, y);
                  ctx.lineTo(width, y);
                  ctx.stroke();
                }

                if (foodPosition) {
                  ctx.fillStyle = 'red';
                  ctx.fillRect(foodPosition.x, foodPosition.y, GRID_SIZE, GRID_SIZE);
                }

                ctx.fillStyle = 'green';
                snake.forEach(segment => {
                  ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
                });
              }
            }
          }, [snake, foodPosition]);

    return (
        canvasRef
    )
}

export default useSnakeCanvasRendering