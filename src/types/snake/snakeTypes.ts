export type Coordinates = {
    x: number
    y: number
}

export type SnakeSegment = Coordinates;
export type Food = Coordinates;

export enum DirectionEnum {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}
export type Direction = keyof typeof DirectionEnum;