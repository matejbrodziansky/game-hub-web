export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const GRID_SIZE = 20;
export const MAX_WIDTH = 600;
export const MAX_HEIGHT = 800;

export const horizontalPadding = 0.05 * screenWidth;
export const verticalPadding = 100;

export const width = Math.min(Math.floor((screenWidth - 2 * horizontalPadding) / GRID_SIZE) * GRID_SIZE, MAX_WIDTH);
export const height = Math.min(Math.floor((screenHeight - 2 * verticalPadding) / GRID_SIZE) * GRID_SIZE, MAX_HEIGHT);

export const canvasWidth = Math.floor(width / GRID_SIZE) * GRID_SIZE;
export const canvasHeight = Math.floor(height / GRID_SIZE) * GRID_SIZE;

export const SNAKE_COLOR = '#2C292B';
export const FOOD_COLOR = '#C63F36';
export const CANVAS_COLOR = '#98BE8D';
export const SNAKE_SIZE = GRID_SIZE;
export const SNAKE_SPEED = 300;

export const SNAKE_START_X = Math.floor((canvasWidth / 2) / GRID_SIZE) * GRID_SIZE;
export const SNAKE_START_Y = Math.floor((canvasHeight / 2) / GRID_SIZE) * GRID_SIZE;

export const SCORE_COUNTER = 10;
