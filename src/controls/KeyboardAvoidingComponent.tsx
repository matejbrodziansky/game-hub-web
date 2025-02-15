import React, { useState } from 'react';

const KeyboardAvoidingComponent: React.FC = () => {
  const [username, setUsername] = useState('');

  const handleFormSubmit = () => {
    console.log('Submitted username:', username);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Header</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 px-3 border-b border-gray-400 bg-white rounded-md w-full max-w-md"
      />
      <div className="mt-4 w-full max-w-md">
        <button
          onClick={handleFormSubmit}
          className="w-full py-3 bg-blue-500 rounded-md shadow-lg text-lg font-semibold text-center text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default KeyboardAvoidingComponent;
