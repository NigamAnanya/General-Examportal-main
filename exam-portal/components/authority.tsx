import React from 'react';
import Image from 'next/image';
import Link from 'next/link';




const AuthorityNav = () => {
  return (
        <div className='bg-white shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)] w-full h-full rounded-lg py-6 flex flex-col justify-between items-start'>
                <Link href="/authority/home" className='ml-7'>
                    <Image src="/assets/images/examportal.png" width={200} height={120} alt="logo" />
                </Link>
                <div className="flex flex-col items-start gap-2 h-full w-full">
                    <h1 className='text-xl text-left cursor-pointer font-bold border-b mt-5 ml-7 '>QUICK MENU</h1>
                    <div className='w-full'>
                        <Link href='/Authority' className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                           
                            <p>Home</p>
                        </Link>                        
                        <Link href='/authority/AddQuestions' className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                           
                            <p>Add Questions</p>
                        </Link>
                        <Link href='/authority/QuestionList' className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                           
                            <p>Question List</p>
                        </Link>
                        <Link href='/authority/UserList' className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                            
                            <p>User List</p>
                        </Link>
                        <Link href="/authority/ExamReport" className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                            
                            <p>Exam Report</p>
                        </Link>
                    </div>

                    
                    <div className='w-full'>
                        <Link href='/authority/AnswerReport' className='flex justify-start items-center w-full gap-4 pl-5 text-lg text-gray-400 hover:text-primary hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] hover:border-l-8 hover:border-primary p-3.5 rounded-lg hover:font-semibold hover:scale-105 transition-all ease-in-out'>
                        
                            <p>Consolidated Report (Ans)</p>
                        </Link>
                        
                        <Link href='/' className='flex justify-center items-center gap-1 mt-5 mx-7 px-16 py-2 text-white bg-primary hover:bg-dark-primary hover:scale-110 transition-all 2s ease-in-out hover:shadow-[0px_0px_10px_5px_rgb(0,0,0,0.04)] p-3 rounded-lg hover:font-semibold bg-red-500'>
                            
                            <p>Log Out</p>
                        </Link>                        
                    </div>
                </div>
            </div>
  )
}

export default AuthorityNav;