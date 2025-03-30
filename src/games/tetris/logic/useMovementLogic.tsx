import { useCallback } from 'react';
import { MoveDirection, MoveDirectionType } from '../types/types';

const useTetrisMovementLogic = () => {
    const DOWN_SPEED = 2

    const run = useCallback((setPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>) => {
        setPosition((prevPosition) => {
            const newPosition = { x: prevPosition.x, y: prevPosition.y + 1 };
            return newPosition;
        });
    }, [])

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

    return {
        run,
        handleMove
    };
};

export default useTetrisMovementLogic;
