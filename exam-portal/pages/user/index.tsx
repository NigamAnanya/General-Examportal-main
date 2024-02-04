import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Logo/Header Component with Tailwind CSS
const LogoHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-800 text-white">
      {/* Placeholder for logo */}
      <Image src="/assets/images/LOGo.jpg" width={200} height={100} alt="Org Logo" className="pb-4"/>
      <h2 className="text-xl font-semibold">Candidate Name</h2>
    </header>
  );
};

// Instructions List Component with Tailwind CSS
const InstructionsList = () => {
  const instructions = [
    "This is a test of spatial abilities...",
    "You are required to answer all the questions.",
    " This is a test of spatial abilities. You would be presented questions on the computer one question at a time in which a logic of sequence, series, mental rotation etc. shall be applied to arrive at answer. You are required to record the answer by selecting the alternative from options A, B, C, D shown on the screen below the problem figure. For example, if B the correct answer, then you have to type your Answer in the box on your computer screen. This test comprises of Objective type Multiple Choice Questions. (MCQs)",
      "You are required to answer all the questions.",
      "All questions are compulsory and each carries equal mark.",
     " There will be NO NEGATIVE MARKING for the wrong answers",
      "Do not maximise or minimise the browser window during the online exam.",
      "Do not close the browser during the test before your exam is complete.",
      "Do not click the 'BACK' button of browser during exam.",
      "After finishing the exam, click on the PRE-CONFIRM button at the bottom of the browser page.",
      "Once submitted, a message shall be displayed Your test has been submitted successfully and you can logout from the candidate online portal.",
    // ...add all other instruction points
  ];

  return (
    <ol className="list-decimal list-inside bg-white shadow-md rounded-lg p-6 space-y-2">
      {instructions.map((instruction, index) => (
        <li key={index} className="text-gray-700 text-base">{instruction}</li>
      ))}
    </ol>
  );
};

// Action Button Component with Tailwind CSS
const ActionButton = ({ text, onClick, disabled, isPrimary = false }) => {
  const primaryStyles = "text-white bg-blue-600 hover:bg-blue-700";
  const defaultStyles = "text-gray-800 bg-gray-200 hover:bg-gray-300";
  const disabledStyles = "bg-gray-400 text-gray-600 cursor-not-allowed";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-colors duration-300 ${disabled ? disabledStyles : isPrimary ? primaryStyles : defaultStyles}`}
    >
      {text}
    </button>
  );
};

// Main Page Layout Component with Tailwind CSS
const ExamInstructionsPage = () => {
  const [hasReadInstructions, setHasReadInstructions] = useState(false);

  const handleReadInstructions = () => {
    setHasReadInstructions(true);
  };

  const handleExit = () => {
    console.log('Exit clicked');
    // Perform exit operations here
  };

  return (
    <div className="flex flex-col h-screen">
      <LogoHeader />
      <main className="flex-grow p-8 bg-slate-200">
        <h1 className="text-2xl font-bold mb-4 text-black">General Instructions</h1>
        <InstructionsList />
        <div className="flex justify-end space-x-4 mt-6">
          <ActionButton text="Exit" onClick={handleExit} />
          <Link href="/user/test1">
          <ActionButton
            text={hasReadInstructions ? "Ready to start" : "I have read & understood the instructions"}
            onClick={handleReadInstructions}
            disabled={hasReadInstructions}
            isPrimary={true}
          />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ExamInstructionsPage;
