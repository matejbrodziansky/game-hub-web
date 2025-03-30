export type shapeOffsetsType = number[][]
export type positionType = { x: number, y: number }

// Movement
export enum MoveDirection {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    ROTATE = 'ROTATE'
}

export type MoveDirectionType = `${MoveDirection}`;