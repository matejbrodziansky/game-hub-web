import React from 'react'
import { height, GRID_SIZE } from '../constants/tetrisConstants';
import { shapeOffsetsType } from '../types/types'
import { getLowestPartOfShapeOffset } from '../utils/tetrisUtils';
import { useGridStateContext } from '../context/GridStateContext';
import { useMovementContext } from '../context/MovementContext';

const useCollision = () => {
    const bottom = height / GRID_SIZE
    const { filledCells } = useGridStateContext();
    const { position } = useMovementContext();

    const checkCollision = ( shapeOffsets: shapeOffsetsType) => {
        const lowestPartOfShape = getLowestPartOfShapeOffset(shapeOffsets)

        if (checkBottomCollision(position.y + lowestPartOfShape)) return true

        if (checkShapesCollision(shapeOffsets, position)) return true

        return false
    }

    const checkShapesCollision = (shapesOffset: shapeOffsetsType, position: { x: number, y: number }) => {
        const FALL_OFFSET = 1;
        for (const [dx, dy] of shapesOffset) {
            const positionKey = `${position.x + dx},${position.y + dy + FALL_OFFSET}`;
            if (filledCells.has(positionKey)) {
                return true;
            }
        }
    }

    const checkBottomCollision = (position: number) => {
        return position === bottom
    }
    
    return {
        checkCollision
    }
}

export default useCollision