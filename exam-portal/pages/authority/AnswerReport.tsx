// Import statements
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorityNav from '@/components/authority';

interface AnswerRecord {
  user: string;
  userName: string;
  questionId: string;
  answerText: string;
}

interface Question {
  _id: string;
  questionText: string;
  questionImage: string;
  answer: string;
  __v: number;
}

const AnswerReport: React.FC = () => {
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/get-questions')
      .then(response => {
        // Assuming response.data is an array of questions
        setQuestions(response.data.map((question: Question) => question.questionText));
      })
      .catch(error => {
        console.error('Error fetching questions', error);
      });

    axios.get('http://localhost:3000/get-answers')
      .then(response => {
        setAnswerRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching answers', error);
      });
  }, []);

  const getAnswersForUser = (userId: string) => {
    const userAnswers = answerRecords.filter(record => record.user === userId);
    return userAnswers.map(answer => answer.answerText);
  };

  return (
    <div className="flex items-center justify-start h-screen relative bg-white">
      <div className="grid grid-cols-[280px_1fr] h-screen w-screen">
        <div className="bg-black my-3 ml-3 rounded-xl shadow-nav">
          <AuthorityNav />
        </div>
        <div className="min-h-screen bg-white p-5">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Consolidated Report</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-sm font-semibold text-gray-700 border border-gray-300">User/Question ID</th>
                    {questions.map((question, index) => (
                      <th key={index} className="p-3 text-sm font-semibold text-gray-700 border border-gray-300">Q{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(new Set(answerRecords.map(record => record.user))).map((userId, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-3 text-sm text-gray-700 border border-gray-300">{userId}</td>
                      {getAnswersForUser(userId).map((answer, i) => (
                        <td key={i} className="p-3 text-sm text-gray-700 border border-gray-300">{answer}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerReport;



