import React from 'react'

interface ScoreProps {
    score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
    return (
        <div
            className='text-center bg-slate-200'
        >
            Score: {score}
        </div>
    )
}

export default Score