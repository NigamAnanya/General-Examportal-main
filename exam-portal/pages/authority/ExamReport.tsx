
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import AuthorityNav from '@/components/authority';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Answer {
  user: string;
  userName: string;
  questionId: string;
  answerText: string;
}

type Question = {
  _id: string;
  questionText: string;
  answer: string;
  questionImage?: string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [answerRecords, setAnswerRecords] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch users
    axios.get('http://localhost:3000/get-users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users', error);
      });

    // Fetch answers
    axios.get('http://localhost:3000/get-answers') // Replace with your actual endpoint
      .then(response => {
        setAnswerRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching answers', error);
      });

    axios.get('http://localhost:3000/get-questions')
      .then(response => {
        setQuestions(response.data)
      })
      .catch(error => {
        console.log("error");
      })
  }, []);



  const handleReportClick = (userId: string) => {
    setSelectedUserId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen relative bg-slate-200">
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-50 bg-opacity-75"
        style={{
          backgroundImage: 'url(/assets/images/backwind.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      ></div>
      <div className="flex items-center justify-center h-screen relative">
        <div className="grid grid-cols-[280px_1fr] h-screen w-screen">
          <div className="bg-black my-3 ml-3 rounded-xl shadow-nav"><AuthorityNav /></div>
          <div className="m-3 py-3 px-5 rounded-xl relative shadow-content flex flex-col justify-start">
            <div className="container mx-auto px-4">
              <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">User Details</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-16 border-gray-300 border-b py-8">
                      <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">ID</th>
                      <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">First Name</th>
                      <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Last Name</th>
                      <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Email</th>
                      <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr className="h-14 border-gray-300 border-b" key={user._id}>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 text-center">{user._id}</td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 text-center">{user.firstName}</td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 text-center">{user.lastName}</td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 text-center">{user.email}</td>
                        <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 text-center">
                          <button
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => handleReportClick(user._id)}
                          >
                            Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.map((user) => (
                  <Modal
                    key={user._id}
                    isOpen={modalIsOpen && selectedUserId === user._id}
                    onRequestClose={closeModal}
                    contentLabel="Report Modal"
                    ariaHideApp={false}
                  >
                    <h2 className='text-black'>User Report for {user.firstName} {user.lastName}</h2>
                    <table className="min-w-full bg-white mt-4">
                      <thead>
                        <tr className="w-full h-12 border-gray-300 border-b">
                          <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Answer Given</th>
                          <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Right Answer</th>
                          <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Reaction</th>
                          <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Result</th>
                          {/* Placeholder for other headers */}
                        </tr>
                      </thead>
                      <tbody>
                        {answerRecords.filter(answer => answer.user === selectedUserId).map((answer, index) => {

                          const correspondingQuestion = questions.find(question => question._id === answer.question);
                          console.log(correspondingQuestion)

                          return (
                            <tr key={index} className="w-full h-12 border-gray-300 border-b">
                              <td className="text-gray-600 pr-6 text-center text-sm leading-4">{answer.answerText}</td>
                              <td className="text-gray-600 pr-6 text-center text-sm leading-4">{correspondingQuestion ? correspondingQuestion.answer : 'N/A'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <button className='bg-red-500 text-white rounded-lg mt-6 p-1' onClick={closeModal}>Close</button>
                  </Modal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserList;