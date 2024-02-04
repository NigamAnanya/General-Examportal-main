// // Dashboard.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     // Replace with your backend endpoint that returns all users
//     axios.get('http://localhost:3000/get-users', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
//       },
//     })
//     .then(response => {
//       setUsers(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching users', error);
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-200 py-5">
//       <div className="container mx-auto px-4">
//         <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">User Details</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="w-full h-16 border-gray-300 border-b py-8">
//                 <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">ID</th>
//                 <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">First Name</th>
//                 <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Last Name</th>
//                 <th className="text-gray-600 font-semibold pr-6 text-center text-sm tracking-normal leading-4">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr className="h-14 border-gray-300 border-b" key={user._id}>
//                   <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user._id}</td>
//                   <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.firstName}</td>
//                   <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.lastName}</td>
//                   <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;


// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorityNav from '@/components/authority';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Replace with your backend endpoint that returns all users
    axios.get('http://localhost:3000/get-users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching users', error);
    });
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
    <div className="flex items-center justify-center h-screen relative ">
      <div className="grid grid-cols-[280px_1fr] h-screen w-screen">
  <div className="bg-black my-3 ml-3 rounded-xl shadow-nav"><AuthorityNav/></div>

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
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="h-14 border-gray-300 border-b" key={user._id}>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user._id}</td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.firstName}</td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.lastName}</td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default UserList;
