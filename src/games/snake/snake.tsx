// TODO : Dont change direction in pause !
import React, { useRef, useEffect, useState, useCallback } from 'react';
import useSnakeFoodLogic from '../logic/snake/snakeFoodLogic';
import useSnakeMovementLogic from '../logic/snake/snakeMovementLogic';
import useSnakeCollisionLogic from '../logic/snake/snakeCollisionLogic';
import SnakeControls from '../../controls/SnakeControls';
import GameOverAlert from '../../components/GameOverAlert';
import useSnakeCanvasRendering from '../hooks/snake/useSnakeCanvasRendering';
import { height, width, CANVAS_COLOR, SCORE_COUNTER } from '../../constants/snakeConstants';
import Pause from '../../components/Pause';

const Snake = () => {
    const { snake, direction, move, changeDirection, resetSnakePosition, speedUp, snakeSpeed } = useSnakeMovementLogic();
    const { spawnFood, checkFoodColision, foodPosition, isFoodOnBoard } = useSnakeFoodLogic(snake);
    const { collision, resetCollision } = useSnakeCollisionLogic(snake);
    const canvasRef = useSnakeCanvasRendering(snake, foodPosition)
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef(0);
    const [score, setScore] = useState(0);
    const [isPaused, setisPaused] = useState(false)

    const animate = useCallback((timestamp: number) => {
        if (collision || isPaused) return;

        if (!lastFrameTimeRef.current) {
            lastFrameTimeRef.current = timestamp;
        }

        const timeDifference = timestamp - lastFrameTimeRef.current;

        if (timeDifference > snakeSpeed) {
            move(direction, false);
            lastFrameTimeRef.current = timestamp;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [collision, direction, move, snakeSpeed, isPaused]);

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
        setScore(0)
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

            setScore(prevScore => prevScore + SCORE_COUNTER)
        }
    }, [snake, direction, checkFoodColision, spawnFood, move]);

    const handlePause = (paused: boolean) => {
        setisPaused(paused)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#fff',
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
                    Your Score: {score}
                </p>

                <Pause isPaused={isPaused} onPause={handlePause} />
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
                    style={{ backgroundColor: CANVAS_COLOR, border: '5px solid #ddd' }}
                />
            </div>

            {/* CONTROLS + GAME OVER */}
            <div style={{ marginTop: '10px' }}>
                <SnakeControls onDirectionChange={changeDirection} onSpeedUp={speedUp} />
                {collision && <GameOverAlert onRestart={onRestart} score={score} />}
            </div>
        </div>

    );
};

export default Snake;
