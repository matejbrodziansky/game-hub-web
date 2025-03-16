import { shapeOffsetsType } from "../types/types";

export const getLowestPartOfShapeOffset = (shapeOffsets: shapeOffsetsType) => {
    return Math.max(...shapeOffsets.map(offset => offset[1])) + 1;
};
