// import React, { useState } from 'react';
// import axios from 'axios';

// const QuestionSubmitForm: React.FC = () => {
//   const [questionText, setQuestionText] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [questionImage, setQuestionImage] = useState<File | null>(null);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       setQuestionImage(file);
  
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // This will contain the base64 encoded string
//         const base64String = reader.result as string;
//         console.log(base64String);
//         // You can also set this to a state if you need to use the base64 string elsewhere
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('questionText', questionText);
//     formData.append('answer', answer);
//     if (questionImage) {
//       console.log(questionImage)
//       formData.append('questionImage', questionImage);
//     }

//     try {
//       await axios.post('http://localhost:3000/add-question', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('Question submitted successfully');
//       setQuestionText('');
//       setAnswer('');
//       setQuestionImage(null);
//     } catch (error) {
//       alert('Error submitting question');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen relative bg-slate-200">

// <div 
//       className="fixed top-0 left-0 w-full h-full bg-gray-50 bg-opacity-75"
//       style={{
//         backgroundImage: 'url(/assets/images/backwind.png)',
//         backgroundAttachment: 'fixed',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
//       }}
//     >
//       {/* Empty div for the background image */}
//     </div>
//       <div className="w-full max-w-lg p-5 absolute">
//         <div className="bg-white bg-opacity-75 rounded-lg shadow-xl p-10">
//         <h2 className="text-3xl font-bold text-center text-black mb-8">Upload Questions</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="questionText" className='text-black '>Question Text:</label>
//           <input
//             id="questionText"
//             type="text"
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="answer" className='text-black'>Answer:</label>
//           <input
//            className="w-full px-4 py-1 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
//             id="answer"
//             type="text"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="questionImage">Question Image:</label>
//           <input
//             className='text-black'
//             id="questionImage"
//             type="file"
//             onChange={handleImageChange}
//           />
//         </div>
//         <button type="submit" className= "w-full py-3 mt-4 bg-green-400 hover:bg-green-700 : rounded-lg text-white font-bold ">Submit Question</button>
//       </form>
//     </div>
//     </div>
//     </div>

//   );
// };

// export default QuestionSubmitForm;


import React, { useState } from 'react';
import axios from 'axios';
import AuthorityNav from '@/components/authority';

const QuestionSubmitForm: React.FC = () => {
  const [questionText, setQuestionText] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionImage, setQuestionImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setQuestionImage(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        // This will contain the base64 encoded string
        const base64String = reader.result as string;
        console.log(base64String);
        // You can also set this to a state if you need to use the base64 string elsewhere
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('questionText', questionText);
    formData.append('answer', answer);
    if (questionImage) {
      console.log(questionImage)
      formData.append('questionImage', questionImage);
    }

    try {
      await axios.post('http://localhost:3000/add-question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Question submitted successfully');
      setQuestionText('');
      setAnswer('');
      setQuestionImage(null);
    } catch (error) {
      alert('Error submitting question');
      console.error(error);
    }
  };

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
    <div className="flex items-center justify-center h-screen relative">
      
      <div className="grid grid-cols-[280px_1fr] h-screen w-screen">
  <div className="bg-black my-3 ml-3 rounded-xl shadow-nav"><AuthorityNav/></div>

    <div className="m-3 py-3 px-5 rounded-xl relative shadow-content flex flex-col">
      <div className="w-full max-w-2xl p-15 items-center justify-center ">
        <div className="bg-white bg-opacity-75 rounded-lg shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Upload Questions</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText" className='text-black '>Question Text:</label>
          <input
            id="questionText"
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="answer" className='text-black'>Answer:</label>
          <input
           className="w-full px-4 py-1 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
            id="answer"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="questionImage" className='text-green-800'>Question Image:</label>
          <input
            className='text-black'
            id="questionImage"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className= "w-full py-3 mt-4 bg-green-400 hover:bg-green-700 : rounded-lg text-white font-bold ">Submit Question</button>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
</div>
  );
};

export default QuestionSubmitForm;
