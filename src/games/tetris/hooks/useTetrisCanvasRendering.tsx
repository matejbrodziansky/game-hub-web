import { useEffect, useRef, useState, useCallback } from 'react';
import { width, height, GRID_SIZE, PIECE_COLOR, TETRIS_COLUMNS } from '../constants/tetrisConstants';
import { shapeOffsetsType } from '../types/types';
import { useGridStateContext } from '../context/GridStateContext';
import { getLowestPartOfShapeOffset } from '../utils/tetrisUtils';

const useTetrisCanvasRendering = (currentShape: shapeOffsetsType) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const initialX = Math.floor(TETRIS_COLUMNS / 2);
    const [position, setPosition] = useState({ x: initialX, y: 0 })
    const { gridState } = useGridStateContext();

    const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = 'green'; // TODO: color to constants

        if (!gridState) return;
        gridState.forEach((row, rowIndex) => {
            ctx.beginPath();
            ctx.moveTo(0, (rowIndex + 1) * GRID_SIZE);
            ctx.lineTo(width, (rowIndex + 1) * GRID_SIZE);
            ctx.stroke();

            row.forEach((cell, cellIndex) => {
                if (cell !== null) {
                    ctx.fillStyle = PIECE_COLOR;
                    const x = GRID_SIZE * cellIndex;
                    const y = (rowIndex + 1) * GRID_SIZE - GRID_SIZE;

                    ctx.fillStyle = PIECE_COLOR;
                    ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);

                    ctx.fillStyle = '#FFFFFF80';
                    ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE * 0.2);
                    ctx.fillRect(x, y, GRID_SIZE * 0.2, GRID_SIZE);

                    ctx.fillStyle = '#00000080';
                    ctx.fillRect(x, y + GRID_SIZE * 0.8, GRID_SIZE, GRID_SIZE * 0.2);
                    ctx.fillRect(x + GRID_SIZE * 0.8, y, GRID_SIZE * 0.2, GRID_SIZE);

                    // ctx.strokeStyle = 'white';
                    ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
                }
            });
        });

        if (gridState.length > 0) {
            gridState[0].forEach((_, colIndex) => {
                ctx.beginPath();
                ctx.moveTo((colIndex + 1) * GRID_SIZE, 0);
                ctx.lineTo((colIndex + 1) * GRID_SIZE, height);
                ctx.stroke();
            });
        }
    }, [gridState]);

    const resetPosition = () => {
        setPosition({ x: Math.floor(TETRIS_COLUMNS / 2), y: 0 });
    };

    const drawShape = (ctx: CanvasRenderingContext2D,) => {

        currentShape.forEach(([dx, dy], i) => {

            const x = (dx + position.x) * GRID_SIZE;
            const y = (dy + position.y) * GRID_SIZE;

            ctx.fillStyle = PIECE_COLOR;
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);

            ctx.fillStyle = '#FFFFFF80';
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE * 0.2);
            ctx.fillRect(x, y, GRID_SIZE * 0.2, GRID_SIZE);

            ctx.fillStyle = '#00000080';
            ctx.fillRect(x, y + GRID_SIZE * 0.8, GRID_SIZE, GRID_SIZE * 0.2);
            ctx.fillRect(x + GRID_SIZE * 0.8, y, GRID_SIZE * 0.2, GRID_SIZE);

            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
        });
    };

    const renderCanvas = () => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGrid(ctx);
                drawShape(ctx);
            }
        }
    };

    const calculateInitialPosition = useCallback((shapeOffset: shapeOffsetsType) => {
        const lowestPart = getLowestPartOfShapeOffset(shapeOffset);

        setPosition({ x: initialX, y: -lowestPart });
    }, [initialX, setPosition]);

    useEffect(() => {
        calculateInitialPosition(currentShape);
    }, [currentShape, calculateInitialPosition])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGrid(ctx);
            }
        }
    }, [gridState, drawGrid]);

    return {
        canvasRef,
        setPosition,
        position,
        renderCanvas,
        resetPosition,
    };
};

export default useTetrisCanvasRendering;


