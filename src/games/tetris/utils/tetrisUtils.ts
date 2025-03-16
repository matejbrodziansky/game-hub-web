import { shapeOffsetsType } from "../types/types";
import {
    L_LEFT_SHAPE_OFFSETS,
    L_MIRRORED_SHAPE_OFFSETS,
    SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
    T_SHAPE_OFFSETS,
    I_SHAPE_OFFSETS
} from '../constants/tetrisShapes';

export const getLowestPartOfShapeOffset = (shapeOffsets: shapeOffsetsType) => {
    return Math.max(...shapeOffsets.map(offset => offset[1])) + 1;
};

export const spawnRandomShape = () => {
    const shapes = [
        L_LEFT_SHAPE_OFFSETS,
        L_MIRRORED_SHAPE_OFFSETS,
        SQUARE_SHAPE_OFFSETS, Z_SHAPE_OFFSETS,
        T_SHAPE_OFFSETS,
        I_SHAPE_OFFSETS
    ]

    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
}