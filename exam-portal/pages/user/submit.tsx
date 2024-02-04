import React from 'react';
const submit: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700">
          Thank you for taking the test. Your responses have been submitted successfully.
        </p>
        {/* You can add additional content or links here if needed */}
      </div>
    </div>
  );
};

export default submit;
