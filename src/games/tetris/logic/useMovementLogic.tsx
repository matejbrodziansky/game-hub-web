import { useCallback } from 'react';

const useTetrisMovementLogic = () => {

    const move = useCallback((setPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>) => {
        setPosition((prevPosition) => {
            const newPosition = { x: prevPosition.x, y: prevPosition.y + 1 };
            return newPosition;
        });
    }, [])

    return { move };
};

export default useTetrisMovementLogic;
