import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { positionType, MoveDirectionType, MoveDirection } from '../types/types';
import { TETRIS_COLUMNS, DOWN_SPEED } from '../constants/tetrisConstants';

interface MovementContextType {
    position: positionType;
    setPosition: React.Dispatch<React.SetStateAction<positionType>>;
    resetPosition: () => void;
    handleMove: (move: MoveDirectionType, setPosition: React.Dispatch<React.SetStateAction<positionType>>) => void
    run: () => positionType
}

const MovementContext = createContext<MovementContextType | null>(null);

export const MovementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const initialX = Math.floor(TETRIS_COLUMNS / 2);
    const [position, setPosition] = useState({ x: initialX, y: 0 })

    const run = useCallback(() => {
        let newPosition: positionType;
        setPosition((prevPosition) => {
            newPosition = { x: prevPosition.x, y: prevPosition.y + 1 };
            return newPosition;
        });
        return newPosition!;
    }, []);


    const resetPosition = () => {
        setPosition({ x: Math.floor(TETRIS_COLUMNS / 2), y: 0 });
    };

    const handleMove = (
        move: MoveDirectionType,
        setPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
    ) => {

        setPosition(prev => {
            if (move === MoveDirection.LEFT) return { ...prev, x: prev.x - 1 };
            if (move === MoveDirection.RIGHT) return { ...prev, x: prev.x + 1 };
            if (move === MoveDirection.DOWN) return { ...prev, y: prev.y + DOWN_SPEED };
            return prev
        })
    }

    return (
        <MovementContext.Provider value={{ position, setPosition, resetPosition, handleMove, run }} >
            {children}
        </MovementContext.Provider >
    )
}

export const useMovementContext = () => {
    const context = useContext(MovementContext)
    if (!context) {
        throw new Error('useMovementContext must be used within a MovementProvider');
    }
    return context;
}
