import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AnswerRecord {
  userId: string;
  userName: string;
  answers: number[]; // Assuming answers are stored as an array of numbers
}

const TimeTakenReport: React.FC = () => {
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    // Replace with your API endpoint that provides the answers
    axios.get('http://localhost:3000/get-answers')
      .then(response => {
        setAnswerRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching answers', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Consolidated Report (Time taken)</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-3 text-sm font-semibold text-gray-700 border border-gray-300">User/Question ID</th>
                {[...Array(30)].map((_, index) => (
                  <th key={index} className="p-3 text-sm font-semibold text-gray-700 border border-gray-300">{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {answerRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 text-sm text-gray-700 border border-gray-300">{record.userName}</td>
                  {record.answers.map((answer, index) => (
                    <td key={index} className="p-3 text-sm text-gray-700 text-center border border-gray-300">{answer}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTakenReport;
