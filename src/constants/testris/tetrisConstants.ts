export const GRID_SIZE = 30;
export const TETRIS_COLUMNS = 10;
export const TETRIS_ROWS = 20;

export const MAX_WIDTH = TETRIS_COLUMNS * GRID_SIZE; // 300px
export const MAX_HEIGHT = TETRIS_ROWS * GRID_SIZE; // 600px

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const horizontalPadding = 0.05 * screenWidth;
export const verticalPadding = 100;

export const width = Math.min(MAX_WIDTH, screenWidth - 2 * horizontalPadding);
export const height = Math.min(MAX_HEIGHT, screenHeight - 2 * verticalPadding);

export const canvasWidth = Math.floor(width / GRID_SIZE) * GRID_SIZE;
export const canvasHeight = Math.floor(height / GRID_SIZE) * GRID_SIZE;

export const TETRIS_COLOR = '#8A9376';
export const PIECE_COLOR = '#000100';
