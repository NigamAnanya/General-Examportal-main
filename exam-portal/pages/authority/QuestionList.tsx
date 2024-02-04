// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// type Question = {
//   _id: string;
//   questionText: string;
//   answer: string;
//   questionImage?: string; // Assuming image is stored as a base64 string or URL
// };

// const QuestionList = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);

//   useEffect(() => {
//     axios.get('http://localhost:3000/get-questions')
//       .then(response => {
//         setQuestions(response.data.map((q: any) => ({
//          ...q,
//           questionImage: `${Buffer.from(q.questionImage?.data).toString('base64')}`
//           })));
//       })
//       .catch(error => console.error('Error fetching questions:', error));
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-200 h-screen">
//       {questions.map((question, index) => (
//         <div key={question._id} className="mb-4 p-3 shadow-lg rounded-md bg-white h-[fit-content]">
//           <h2 className="text-lg font-bold text-black">Question {index + 1}: {question.questionText}</h2>
//           {/* <p className='text-black'>{question.answer}</p> */}
//           {question.questionImage && (
//             <img 
//             src={ "data:image;base64,"+ question.questionImage }   
//               alt="Question Image" 
//               className='h-auto max-w-full my-3' 
//             />
//           )}
//           <p className='text-black text-xl'>Answer : {question.answer}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionList;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorityNav from '@/components/authority';

type Question = {
  _id: string;
  questionText: string;
  answer: string;
  questionImage?: string; // Assuming image is stored as a base64 string or URL
};

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/get-questions')
      .then(response => {
        setQuestions(response.data.map((q: any) => ({
         ...q,
          questionImage: `${Buffer.from(q.questionImage?.data).toString('base64')}`
          })));
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen relative bg-slate-200">

    {/* Apply background image using inline styles */}
    <div 
      className="fixed top-0 left-0 w-full h-full bg-gray-50 bg-opacity-75"
      style={{
        backgroundImage: 'url(/assets/images/backwind.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Empty div for the background image */}
    </div>

    <div className="flex items-center justify-center w-full relative h-screen overflow-y-auto">
      <div className="grid grid-cols-[280px_1fr] h-screen w-screen">
  <div className="bg-black my-3 ml-3 rounded-xl shadow-nav"><AuthorityNav/></div>

    <div className="m-3 py-3 px-5 rounded-xl relative shadow-content flex flex-col justify-start">
      {questions.map((question, index) => (
        <div key={question._id} className="mb-4 p-3 shadow-lg rounded-md bg-white h-[fit-content]">
          <h2 className="text-lg font-bold text-black">Question {index + 1}: {question.questionText}</h2>
          {/* <p className='text-black'>{question.answer}</p> */}
          {question.questionImage && (
            <img 
            src={ "data:image;base64,"+ question.questionImage }   
              alt="Question Image" 
              className='h-auto max-w-full my-3' 
            />
          )}
          <p className='text-black text-xl'>Answer : {question.answer}</p>
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
  );
};

export default QuestionList;