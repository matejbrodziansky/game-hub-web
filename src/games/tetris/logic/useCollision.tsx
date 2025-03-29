import React from 'react'
import { width, height, GRID_SIZE, PIECE_COLOR } from '../constants/tetrisConstants';
import { shapeOffsetsType } from '../types/types'
import { getLowestPartOfShapeOffset } from '../utils/tetrisUtils';
import { useGridStateContext } from '../context/GridStateContext';

const useCollision = () => {
    const bottom = height / GRID_SIZE
    const { filledCells } = useGridStateContext();

    const checkCollision = (position: { x: number, y: number }, shapeOffsets: shapeOffsetsType) => {
        const lowestPartOfShape = getLowestPartOfShapeOffset(shapeOffsets)
        if (checkBottomCollision(position.y + lowestPartOfShape)) {
            return true
        }

        const FALL_OFFSET = 1;
        for (const [dx, dy] of shapeOffsets) {
            const positionKey = `${position.x + dx},${position.y + dy + FALL_OFFSET}`;
            if (filledCells.has(positionKey)) {
                return true;
            }
        }

        return false
    }

    const checkBottomCollision = (position: number) => {
        return position === bottom
    }

    return {
        checkCollision
    }
}

export default useCollision