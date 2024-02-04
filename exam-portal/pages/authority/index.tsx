// import AuthorityNav from "@/components/authority";


// const Homepage = () => {

//   return (
//     <div className="grid md:grid-cols-[280px_1fr] md:grid-rows-1 h-screen w-screen overflow-none bg-slate-200">
//       <div className="bg-black my-3 ml-3 rounded-xl shadow-nav hidden md:block" id="nav"><AuthorityNav/></div>
//       <div className="m-3 p-16 rounded-xl relative bg-[rgba(255,255,255,0.5)] shadow-content flex-center flex-col">
        
//         <div className="text-3xl md:text-3xl w-4/5 text-black font-medium flex-center flex-col">
//           <p></p>
//           <p></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homepage;


import React from 'react';
import AuthorityNav from '@/components/authority';

const Dashboard: React.FC = () => {
  // You would typically fetch this data from an API
  const testData = {
    totalStudents: 763,
    studentsTested: 509135,
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

    <div className="m-3 py-3 px-5 rounded-xl relative shadow-content flex flex-col justify-start">
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-semibold mb-4">Test Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 rounded-lg p-4">
            <div className="text-blue-800 text-sm font-semibold">Total Students</div>
            <div className="text-blue-800 text-3xl font-bold">30</div>
          </div>
          <div className="bg-green-100 rounded-lg p-4">
            <div className="text-green-800 text-sm font-semibold">Students Who Gave Test</div>
            <div className="text-green-800 text-3xl font-bold">3</div>
          </div>
          {/* Additional dashboard items would go here */}
        </div>
      </div>
    </div>
    </div></div>
    </div>
  );
};

export default Dashboard;
