import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Array of question objects for demonstration purposes
const questions = [
  // Example questions
  {
    questionNumber: 1,
    questionText: "What is the capital of France?",
    imageUrl: "/assets/images/reasoning1.png", // Replace with actual image path
  },
  {
    questionNumber: 2,
    questionText: "What is the capital of Spain?",
    imageUrl: "/assets/images/reasoning2.png", // Replace with actual image path
  },
  {
    questionNumber: 3,
    questionText: "What is the capital of Spain?",
    imageUrl: "/assets/images/reasoning3.png", // Replace with actual image path
  },
  {
    questionNumber: 4,
    questionText: "What is the capital of Spain?",
    imageUrl: "/assets/images/reasoning4.png", // Replace with actual image path
  },
  {
    questionNumber: 5,
    questionText: "What is the capital of Spain?",
    imageUrl: "/assets/images/reasoning5.png", // Replace with actual image path
  },
  // ...add as many questions as you have
];

// Component for displaying each question card
const QuestionCard: React.FC<{ question: typeof questions[number]; onInputChange: (value: string) => void }> = ({ question, onInputChange }) => {
  const [answer, setAnswer] = useState('');

  // useEffect to clear the answer when the question changes
  useEffect(() => {
    setAnswer(''); // Clear the answer when the question changes
  }, [question]);

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    onInputChange(newValue);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex flex-col items-start space-y-4">
        <div className="text-lg font-semibold text-black">Question {question.questionNumber}:</div>
        <p className="text-gray-700">{question.questionText}</p>
        <img src={question.imageUrl} alt="Question Illustration" className="my-4 max-h-[300px] max-w-[100%] object-cover" />
        <input
          type="text"
          value={answer}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Type your answer here"
        />
      </div>
    </div>
  );
};

// Main ExamPage component
const ExamPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''));

  // Function to handle clicking on the "Previous Question" button
  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Function to handle clicking on the "Next Question" button
  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  // Function to handle input changes in the QuestionCard component
  const handleInputChange = (value: string) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = value;
      return updatedAnswers;
    });
  };

  // Get the current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-8 bg-slate-200">
        {/* Header section */}
        <div className="flex justify-between items-center bg-blue-700 text-white p-4">
          <h2 className="text-4xl font-semibold">Demo Test</h2>
          <img src="/assets/images/examportal.png" alt="Org Logo" className="h-16" />
        </div>
        
        {/* Display current question card */}
        <QuestionCard question={currentQuestion} onInputChange={handleInputChange} />
      </div>

      {/* Footer section with navigation buttons */}
      <div className="p-4 bg-white flex justify-between items-center border-t">
        <button
          onClick={handlePreviousClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>
        <Link href="/user/test1" className='ml-7'>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Actual Test
          </button>
        </Link>
        <button
          onClick={handleNextClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
