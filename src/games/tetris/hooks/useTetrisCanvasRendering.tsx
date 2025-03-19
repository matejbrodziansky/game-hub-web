import { useEffect, useRef, useState } from 'react';
import { width, height, GRID_SIZE, PIECE_COLOR } from '../constants/tetrisConstants';
import { shapeOffsetsType } from '../types/types';

import {
    L_LEFT_SHAPE_OFFSETS,
    L_MIRRORED_SHAPE_OFFSETS,
    SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
    T_SHAPE_OFFSETS,
    I_SHAPE_OFFSETS
} from '../constants/tetrisShapes';
import useGridState from './useGridState';

const useTetrisCanvasRendering = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const centerX = useRef(0);
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [fixedShapes, setFixedShapes] = useState<shapeOffsetsType[]>([]);
    const { gridState } = useGridState()


    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = 'green'; // TODO: color to constants
        gridState.forEach((_, rowIndex) => {
            ctx.beginPath();
            ctx.moveTo(0, (rowIndex + 1) * GRID_SIZE);
            ctx.lineTo(width, (rowIndex + 1) * GRID_SIZE);
            ctx.stroke();
        });

        if (gridState.length > 0) {
            gridState[0].forEach((_, colIndex) => {
                ctx.beginPath();
                ctx.moveTo((colIndex + 1) * GRID_SIZE, 0);
                ctx.lineTo((colIndex + 1) * GRID_SIZE, height);
                ctx.stroke();
            });
        }
    };



    const resetPosition = () => {
        setPosition({ x: 0, y: 0 })
    }

    const drawShape = (ctx: CanvasRenderingContext2D, shapeOffsets: shapeOffsetsType) => {

        const spawnXMiddle = width / 2;

        shapeOffsets.forEach(([dx, dy], i) => {
            // "Center" to middle
            if (i === 0 && dx !== 0) {
                centerX.current = dx * GRID_SIZE;
            }

            const x = (spawnXMiddle + (dx + position.x) * GRID_SIZE) - centerX.current * 2;
            const y = (dy + position.y) * GRID_SIZE;

            ctx.fillStyle = PIECE_COLOR;
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);

            // Svetlý okraj hore a vľavo
            ctx.fillStyle = '#FFFFFF80';
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE * 0.2);
            ctx.fillRect(x, y, GRID_SIZE * 0.2, GRID_SIZE);

            // Tmavý okraj dole a vpravo
            ctx.fillStyle = '#00000080';
            ctx.fillRect(x, y + GRID_SIZE * 0.8, GRID_SIZE, GRID_SIZE * 0.2);
            ctx.fillRect(x + GRID_SIZE * 0.8, y, GRID_SIZE * 0.2, GRID_SIZE);

            // Biely obrys
            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);

        });
    }

    const renderCanvas = (shapeOffsets: number[][]) => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawGrid(ctx)

                drawShape(ctx, shapeOffsets)
            }
        }
    }

    return (
        {
            canvasRef,
            setPosition,
            position,
            drawGrid,
            renderCanvas,
            resetPosition,
            setFixedShapes
        }
    )
}

export default useTetrisCanvasRendering