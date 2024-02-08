import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
  //   try {
  //     const response = await axios.post('http://localhost:3000/login', {
  //       email,
  //       password,
  //     });
  
  //     if (response.data && response.data.userId) {
  //       localStorage.setItem('userId', response.data.userId); // Storing user ID in local storage
  //       router.push('/user');
  //       setMessage('Login successful!');
  //     } else {
  //       setMessage('Login failed. No user ID returned.');
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       setMessage(error.response.data);
  //     } else {
  //       setMessage('An error occurred while logging in.');
  //     }
  //   }
  // };
  
  
  try {
    // Check if email and password are both 'admin'
    if (email === 'admin@gmail.com' && password === 'admin') {
      // Navigate to the authority page
      router.push('/authority');
    } else {
    }
    const response = await axios.post('http://localhost:3000/login', {
      email,
      password,
    });
      // Navigate to the user page
      router.push('/user');

    setMessage('Login successful!');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      setMessage(error.response.data);
    } else {
      setMessage('An error occurred while logging in.');
    }
  }
};

  return (
    <div className="flex items-center justify-center h-screen relative bg-slate-200">
      <div className="w-full max-w-lg p-5 absolute">
        <div className="bg-white bg-opacity-75 rounded-lg shadow-xl p-10">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-sm font-bold text-black block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-bold text-black block mb-2 mt-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 bg-opacity-50 text-black border border-gray-500 focus:border-indigo-500"
          />
        </div>
        <button type="submit" className= "w-full py-3 mt-4 hover:bg-blue-700 : bg-blue-300 rounded-lg text-white font-bold ">Login here</button>
      </form>
      {message && <p className='text-black mt-4 mb-4'>{message}</p>}
      <div className="text-[50] text-blue-800 hover:underline">
        <Link href="/signup">
          <p>Don't have an account ? Sign Up</p>
        </Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default LoginPage;
