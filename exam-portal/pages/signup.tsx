// pages/signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      console.log("BHakk")
      await axios.post('http://localhost:3000/signup', formData);
      console.log("OKAY")
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Signup failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
      <h1 className="font-semibold text-lg mr-auto">Signup</h1>
      <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
      </div>
      <form className='text-black' onSubmit={handleSubmit}>
      <div className="flex flex-col mb-2">
      <div className="flex relative ">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="First Name"
          required
        />
        </div>
        </div>
        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Last Name"
          required
        />
        </div>
        </div>
        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Email"
          required
        />
        </div>
        </div>

        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="age"
          name="age"
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="age"
          required
        />
        </div>
        </div>

        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="Gender"
          name="Gender"
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Gender"
          required
        />
        </div>
        </div>

        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="Education"
          name="Education"
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Education"
          required
        />
        </div>
        </div>

        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="password"
          name="password"
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        </div>
        </div>
        <div className="flex flex-col mb-2">
        <div className="flex relative ">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        </div>
        </div>
        <button  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " type="submit">Sign Up</button>
        <div className='mt-{20px} text-white' >
        <Link href="/">
          <p className='text-blue-500 mt-5'>Back to login</p>
        </Link>
      </div>
      </form>
      {message && <p className='text-black'>{message}</p>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignupPage;



