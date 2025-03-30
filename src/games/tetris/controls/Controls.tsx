import React from 'react';
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaRocket } from 'react-icons/fa';
import { MoveDirection } from '../constants/tetrisConstants';


interface ControlsProps {
  handleMove: (direction: MoveDirection) => void;
}

const Controls: React.FC<ControlsProps> = ({ handleMove }) => {
  return (
    <div className="flex justify-center items-center gap-2 p-4">
      {/* Arrow Key Left */}
      <button
        onClick={() => handleMove(MoveDirection.LEFT)}
        className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
      >
        <FaArrowLeft className="text-gray-300" size={24} />
      </button>

      <div className="flex flex-col items-center gap-2">

        {/* Arrow Key Down */}
        <button
          onClick={() => handleMove(MoveDirection.DOWN)}
          className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
        >
          <FaArrowDown className="text-gray-300" size={24} />
        </button>
      </div>

      {/* Arrow Key Right */}
      <button
        onClick={() => handleMove(MoveDirection.RIGHT)}
        className="flex justify-center items-center p-4 bg-black border border-gray-300 rounded-md hover:bg-gray-800"
      >
        <FaArrowRight className="text-gray-300" size={24} />
      </button>
    </div>
  );
};

export default Controls;
