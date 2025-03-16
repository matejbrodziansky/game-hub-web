import React from 'react'
import { height, GRID_SIZE } from '../constants/tetrisConstants';
import { shapeOffsetsType } from '../types/types'
import { getLowestPartOfShapeOffset } from '../utils/tetrisUtils';

const useCollision = () => {
    const bottom = height / GRID_SIZE


    const checkCollision = (position: { x: number, y: number }, shapeOffsets: shapeOffsetsType) => {

        const lowestPartOfShape = getLowestPartOfShapeOffset(shapeOffsets)

        if (checkBottomCollision(position.y + lowestPartOfShape)) {
            return true
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