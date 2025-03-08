import { useEffect, useRef, useState } from 'react';
import { width, height, GRID_SIZE, PIECE_COLOR } from '../../constants/testris/tetrisConstants';
import {
    L_LEFT_SHAPE_OFFSETS,
    L_MIRRORED_SHAPE_OFFSETS,
    SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
    Z_MIRRORED_SHAPE_OFFSETS,
    T_SHAPE_OFFSETS
} from '../../constants/testris/tetrisShapes';

const useTetrisCanvasRendering = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const centerX = useRef(0);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {

                // Clear canvas
                ctx.clearRect(0, 0, width, height);

                // draw a grid
                ctx.strokeStyle = 'green'; // TODO: color to constants
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

                const spawnXMiddle = width / 2

                const drawShape = (ctx: CanvasRenderingContext2D, startX: number, startY: number, shapeOffsets: number[][]) => {
                    shapeOffsets.forEach(([dx, dy], i) => {


                        // Center to middle 
                        if (i === 0 && dx !== 0) {
                            centerX.current = dx * GRID_SIZE;
                        }
                        const x = (startX + dx * GRID_SIZE) - centerX.current;
                        const y = startY + dy * GRID_SIZE;

                        // Hlavná farba bloku
                        ctx.fillStyle = PIECE_COLOR;
                        ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);

                        // Svetlý okraj hore a vľavo
                        ctx.fillStyle = '#FFFFFF80'; // Polopriehľadná biela (80 = 50% opacity)
                        ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE * 0.2); // Horný pásik
                        ctx.fillRect(x, y, GRID_SIZE * 0.2, GRID_SIZE); // Ľavý pásik

                        // Tmavý okraj dole a vpravo
                        ctx.fillStyle = '#00000080'; // Polopriehľadná čierna
                        ctx.fillRect(x, y + GRID_SIZE * 0.8, GRID_SIZE, GRID_SIZE * 0.2); // Dolný pásik
                        ctx.fillRect(x + GRID_SIZE * 0.8, y, GRID_SIZE * 0.2, GRID_SIZE); // Pravý pásik

                        // Biely obrys
                        ctx.strokeStyle = 'white';
                        ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
                    });
                };


                // drawShape(ctx, spawnXMiddle, 0, lshapeOffsets)
                // drawShape(ctx, spawnXMiddle, 0, squareShapeOffsets)
                // drawShape(ctx, spawnXMiddle, 0, squareShapeOffsets)
                drawShape(ctx, spawnXMiddle, 0, L_MIRRORED_SHAPE_OFFSETS)
                // drawShape(ctx, spawnXMiddle, 0, SQUARE_SHAPE_OFFSETS)
                // drawShape(ctx, spawnXMiddle, 0, Z_SHAPE_OFFSETS)
                // drawShape(ctx, spawnXMiddle, 0, Z_MIRRORED_SHAPE_OFFSETS)
                // drawShape(ctx, spawnXMiddle, 0, T_SHAPE_OFFSETS)
            }
        }
    }, []);

    return (
        canvasRef
    )
}

export default useTetrisCanvasRendering