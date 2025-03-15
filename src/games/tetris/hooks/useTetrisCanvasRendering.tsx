import { useRef, useState } from 'react';
import { width, height, GRID_SIZE, PIECE_COLOR } from '../constants/tetrisConstants';

const useTetrisCanvasRendering = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const centerX = useRef(0);
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
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
    };


    const drawShape = (ctx: CanvasRenderingContext2D, shapeOffsets: number[][]) => {

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
            renderCanvas
        }
    )
}

export default useTetrisCanvasRendering