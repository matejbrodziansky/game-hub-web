import React, { useState } from 'react'
import {TETRIS_ROWS, TETRIS_COLUMNS } from '../constants/tetrisConstants';


const useGridState = () => {
    const [gridState, setGridState] = useState(() =>
        Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLUMNS).fill(null))
    );

    return {
        gridState
    }
}

export default useGridState
