import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TETRIS_ROWS, TETRIS_COLUMNS } from '../constants/tetrisConstants';
import { shapeOffsetsType, positionType } from '../types/types';

interface GridStateContextType {
    gridState: (boolean | null)[][];
    filledCells: Set<string>;
    updateGridOnCollision: (shapeOffset: shapeOffsetsType, position: positionType) => void;
}

const GridStateContext = createContext<GridStateContextType | null>(null);


export const GridStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gridState, setGridState] = useState(
        Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLUMNS).fill(null))
    );
    const [filledCells, setFilledCells] = useState(new Set<string>())

    const updateGridOnCollision = (shapeOffset: shapeOffsetsType, position: positionType) => {
        setGridState(prevState => {
            const newState = prevState.map(row => [...row]);
            shapeOffset.forEach(([dx, dy]) => {
                const y = position.y + dy;
                const x = position.x + dx;
                if (y >= 0 && y < TETRIS_ROWS && x >= 0 && x < TETRIS_COLUMNS) {
                    newState[y][x] = true;

                    setFilledCells(prev => {
                        const cellKey = `${x},${y}`;
                        return new Set([...Array.from(prev), cellKey]);
                    });
                }
            });
            return newState;
        });
    };

    return (
        <GridStateContext.Provider value={{ gridState, filledCells, updateGridOnCollision }}>
            {children}
        </GridStateContext.Provider>
    );
};

export const useGridStateContext = () => {
    const context = useContext(GridStateContext);
    if (!context) {
        throw new Error('useGridStateContext must be used within a GridStateProvider');
    }
    return context;
};
