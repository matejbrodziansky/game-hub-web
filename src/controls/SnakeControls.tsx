import React from 'react';
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaRocket } from 'react-icons/fa';
import { Direction } from '../types/snake/snakeTypes';

interface SnakeControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onSpeedUp: () => void;
}

const SnakeControls: React.FC<SnakeControlsProps> = ({ onDirectionChange, onSpeedUp}) => {
  return (
    <div className="flex justify-center items-center gap-2 p-4">
      {/* Arrow Key Left */}
      <button
        onClick={() => onDirectionChange('LEFT')}
        className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
      >
        <FaArrowLeft className="text-gray-300" size={24} />
      </button>

      <div className="flex flex-col items-center gap-2">
        {/* Arrow Key Up */}
        <button
          onClick={() => onDirectionChange('UP')}
          className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
        >
          <FaArrowUp className="text-gray-300" size={24} />
        </button>

        {/* Arrow Key Down */}
        <button
          onClick={() => onDirectionChange('DOWN')}
          className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
        >
          <FaArrowDown className="text-gray-300" size={24} />
        </button>
      </div>

      {/* Arrow Key Right */}
      <button
        onClick={() => onDirectionChange('RIGHT')}
        className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
      >
        <FaArrowRight className="text-gray-300" size={24} />
      </button>

      <div className="">
        <button
          onTouchStart={() => onSpeedUp()}
          onMouseDown={() => onSpeedUp()}
          className="flex justify-center items-center p-4 bg-blue-500 border border-gray-300 rounded-md hover:bg-gray-800"
        >
          <FaRocket className="text-gray-300" size={24} />
        </button>
      </div>
    </div>
  );
};

export default SnakeControls;
