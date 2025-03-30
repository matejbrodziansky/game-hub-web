import React, { createContext, useContext, useState, ReactNode } from 'react';
import { spawnRandomShape } from '../utils/tetrisUtils';

interface ShapeContextType {
    currentShape: number[][];
    spawnNewShape: () => void;
}

const ShapeContext = createContext<ShapeContextType | null>(null);

export const ShapeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentShape, setCurrentShape] = useState(spawnRandomShape);

    const spawnNewShape = () => {
        setCurrentShape(spawnRandomShape());
    };

    return (
        <ShapeContext.Provider value={{ currentShape, spawnNewShape }}>
            {children}
        </ShapeContext.Provider>
    );
};

export const useShapeContext = () => {
    const context = useContext(ShapeContext);
    if (!context) {
        throw new Error('useShapeContext must be used within a ShapeProvider');
    }
    return context;
};
