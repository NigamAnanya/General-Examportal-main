// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface IQuestion {
//   questionText: string;
//   answer: string;
//   _id: string;
//   questionImage?: string | any; // Base64 encoded string
// }

// const QuestionsDisplay: React.FC = () => {
//   const [questions, setQuestions] = useState<IQuestion[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answer, setAnswer] = useState('');

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/get-questions');

//         setQuestions(response.data.map((q: IQuestion) => ({
//           ...q,
//           questionImage: `${Buffer.from(q.questionImage.data).toString('base64')}`
//         })));
//       } catch (error) {
//         console.error('Error fetching questions', error);
//       }
//     };

//     fetchQuestions();
//   }, []);


//   const saveAnswer = async () => {
//     try {
//       const userId = localStorage.getItem('userId'); // Retrieve the user's ID
//       console.log(userId)
//       if (!userId) {
//         console.error('User ID not found');
//         return;
//       }
  
//       await axios.post('http://localhost:3000/save-answer', {
//         userId: userId,
//         questionId: questions[currentQuestionIndex]._id,
//         answer: answer,
//       });

//       console.log()
//     } catch (error) {
//       console.error('Error saving answer', error);
//     }
//   };
  
  

//   const nextQuestion = async() => {
//     await saveAnswer();
//     setAnswer('');
//     setCurrentQuestionIndex((prevIndex) =>
//       prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
//     );
//   };

//   const previousQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : prevIndex
//     );
//   };

//   var currentQuestion = questions[currentQuestionIndex];
//   console.log(currentQuestion)

//   return (
//     <div className='m-[20px] border border-slate-200 p-4 rounded-md shadow-2xl h-screen overflow-y-auto'>
//       {currentQuestion ? (
//         <div>
//           {currentQuestion.questionImage && (
//             <img src={ "data:image;base64,"+currentQuestion.questionImage } className='h-[500px] w-[2000px]' />

//           )}
//           <div className='text-black'>Question {currentQuestionIndex + 1}: {currentQuestion.questionText}</div>
//           <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className='text-black'/>
//           <div className='flex justify-between mt-4'>
//             <button onClick={previousQuestion} className='text-white bg-red-400 p-1 rounded-md'>Previous Question</button>
//             <button onClick={nextQuestion} className='text-white bg-blue-400 p-1 rounded-md'>Next Question</button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading quesions...</p>
//       )}
//     </div>
//   );
// };

// export default QuestionsDisplay;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface IQuestion {
  questionText: string;
  answer: string;
  _id: string;
  questionImage?: string | any; // Base64 encoded string
}

const QuestionsDisplay: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-questions');

        setQuestions(
          response.data.map((q: IQuestion) => ({
            ...q,
            questionImage: `${Buffer.from(q.questionImage.data).toString('base64')}`,
          }))
        );
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const saveAnswer = async (questionId: string) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      await axios.post('http://localhost:3000/save-answer', {
        userId: userId,
        questionId: questionId,
        answer: answer,
      });

      console.log('Answer saved successfully');
    } catch (error) {
      console.error('Error saving answer', error);
    }
  };

  const submitTest = async () => {
    try {
      // Set loading state to true
      setIsSubmitting(true);

      // Save the answer before submitting the test
      await saveAnswer(questions[currentQuestionIndex]._id);

      // Additional logic for submitting the test if needed

      console.log('Test submitted successfully');
    } catch (error) {
      console.error('Error submitting test', error);
    } finally {
      // Set loading state back to false
      setIsSubmitting(false);
    }
  };

  const nextQuestion = async () => {
    // Save the answer before moving to the next question
    await saveAnswer(questions[currentQuestionIndex]._id);

    if (currentQuestionIndex < questions.length - 1) {
      // If there are more questions, move to the next question
      setAnswer('');
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, show the "Submit Test" button
      submitTest();
    }
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  var currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='m-[20px] border border-slate-200 p-4 rounded-md shadow-2xl h-screen overflow-y-auto'>
                <div className='text-black text-xl'>
            Question {currentQuestionIndex + 1}: {currentQuestion.questionText}
          </div>
      {currentQuestion ? (
        <div>
          {currentQuestion.questionImage && (
            <img
              src={'data:image;base64,' + currentQuestion.questionImage}
              className='my-4 h-[400px] w-[1000px]'
            />
          )}

          <input
            type='text'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='text-black'
          />
          <div className='flex justify-between mt-4'>
            <button onClick={previousQuestion} className='text-white bg-red-400 p-1 rounded-md'>
              Previous Question
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              // Use Link for the "Submit Test" button
              <Link href='/user/submit' className='ml-7'>
                <button
                  onClick={() => saveAnswer(questions[currentQuestionIndex]._id)}
                  className={`text-white ${isSubmitting ? 'bg-gray-400' : 'bg-green-400'} p-1 rounded-md`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
              </Link>
            ) : (
              // Use button for "Next Question" when it's not the last question
              <button
                onClick={() => {
                  saveAnswer(questions[currentQuestionIndex]._id);
                  setAnswer('');
                  setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                }}
                className='text-white bg-blue-400 p-1 rounded-md'
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default QuestionsDisplay;