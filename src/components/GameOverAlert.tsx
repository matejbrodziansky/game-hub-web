import React from 'react';
import { FaRedo } from 'react-icons/fa';

interface GameOverAlertProps {
    onRestart: () => void;  
}

const GameOverAlert: React.FC<GameOverAlertProps> = ({ onRestart }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Game Over</h2>
                <button
                    onClick={onRestart}
                    className="bg-blue-500 px-4 py-2 rounded-lg flex items-center justify-center"
                >
                    <span className="text-white text-lg">
                        <FaRedo size={20} className="inline-block" /> Restart
                    </span>
                </button>
            </div>
        </div>
    );
};

export default GameOverAlert;
