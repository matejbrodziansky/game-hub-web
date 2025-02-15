import React, { useRef, useEffect, useCallback } from 'react';
import useSnakeFoodLogic from '../../logic/snake/snakeFoodLogic';
import useSnakeMovementLogic from '../../logic/snake/snakeMovementLogic';
import useSnakeCollisionLogic from '../../logic/snake/snakeCollisionLogic';
import SnakeControls from '../../controls/SnakeControls';
import GameOverAlert from '../../components/GameOverAlert';
import useSnakeCanvasRendering from '../hooks/useSnakeCanvasRendering';
import { height, width, CANVAS_COLOR } from '../../constants/snakeConstants';

const Snake = () => {
    const { snake, direction, move, changeDirection, resetSnakePosition, speedUp, snakeSpeed } = useSnakeMovementLogic();
    const { spawnFood, checkFoodColision, foodPosition, isFoodOnBoard } = useSnakeFoodLogic(snake);
    const { collision, resetCollision } = useSnakeCollisionLogic(snake);
    const canvasRef = useSnakeCanvasRendering(snake, foodPosition)
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef(0);

    const animate = useCallback((timestamp: number) => {
        if (collision) return;

        if (!lastFrameTimeRef.current) {
            lastFrameTimeRef.current = timestamp;
        }

        const timeDifference = timestamp - lastFrameTimeRef.current;

        if (timeDifference > snakeSpeed) {
            move(direction, false);
            lastFrameTimeRef.current = timestamp;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [collision, direction, move, snakeSpeed]);

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [collision, move, direction, animate]);

    const onRestart = () => {
        resetSnakePosition();
        resetCollision();
    };

    useEffect(() => {
        if (isFoodOnBoard) return;
        spawnFood();
    }, [spawnFood, isFoodOnBoard]);

    useEffect(() => {
        if (checkFoodColision()) {
            spawnFood();
            move(direction, true);
        }
    }, [snake, direction, checkFoodColision, spawnFood, move]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fff', marginTop: '15px' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    style={{ backgroundColor: CANVAS_COLOR, border: '5px solid #ddd' }}
                />
            </div>
            <div style={{ margin: '10px auto' }}>
                <SnakeControls onDirectionChange={changeDirection} onSpeedUp={speedUp} />
                {collision && <GameOverAlert onRestart={onRestart} />}
            </div>
        </div>
    );
};

export default Snake;
