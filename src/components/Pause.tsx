import React from 'react'
import { FaPause, FaPlay } from 'react-icons/fa';

interface pauseProps {
    onPause: (paused: boolean) => void;
    isPaused: boolean;
}

const Pause: React.FC<pauseProps> = ({ isPaused, onPause }) => {

    const togglePause = () => {
        onPause(!isPaused);
    };

    return (<>
        <button
            onClick={togglePause}
            className="flex justify-center items-center p-4 bg-blue-500 border border-gray-300 rounded-md hover:bg-gray-800"
        >
            {isPaused ?
                <FaPlay className="text-gray-300" size={24} /> :
                <FaPause className="text-gray-300" size={24} />
            }
        </button>

    </>)
}

export default Pause