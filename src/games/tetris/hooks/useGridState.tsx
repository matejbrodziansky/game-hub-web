import React, { useState } from 'react';
import { TETRIS_ROWS, TETRIS_COLUMNS } from '../constants/tetrisConstants';
import { shapeOffsetsType, positionType } from '../types/types';

const useGridState = () => {
    const [gridState, setGridState] = useState(() =>
        Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLUMNS).fill(null))
    );

    const updateGridOnCollision = (shapeOffset: shapeOffsetsType, position: positionType) => {
        shapeOffset.forEach(([dx, dy], i) => {
            const y = position.y + dy;
            const x = position.x + dx;
            setGridState(prevState => {
                const newState = prevState.map(row => [...row]);
                if (y >= 0 && y < TETRIS_ROWS && x >= 0 && x < TETRIS_COLUMNS) {
                    newState[y][x] = true;
                }
                return newState
            })
        })

    };

    return {
        gridState,
        setGridState,
        updateGridOnCollision
    };
};

export default useGridState;






