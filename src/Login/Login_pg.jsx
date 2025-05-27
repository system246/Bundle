import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


const Login_pg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setEmail('');
    setPassword('');
  };

  return (
  <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500 px-4 py-10">
  <div className="bg-white rounded-3xl  shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
    
    {/* Left Side - Welcome */}
    <div className="md:w-1/2 w-full bg-gradient-to-br from-blue-800 to-blue-600 p-10 text-white relative overflow-hidden">
      <h2 className="text-4xl font-bold mb-4">WELCOME</h2>
      <p className="text-sm">Your headline name</p>
      <p className="text-xs mt-2">Nice to see you again! Enter your details to sign in.</p>

      {/* Decorative Circles */}
      <div className="absolute w-40 h-40 bg-blue-500 rounded-full -bottom-10 -left-10 opacity-30"></div>
      <div className="absolute w-32 h-32 bg-blue-700 rounded-full -top-8 -right-8 opacity-30"></div>
      <div className="absolute w-24 h-24 bg-blue-400 rounded-full top-1/2 -left-6 opacity-30"></div>
    </div>

    {/* Right Side - Form */}
    <div className="md:w-1/2 w-full p-10 flex flex-col justify-center space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-16 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
{showPassword ? <EyeOutlined /> :<EyeInvisibleOutlined />}
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Remember me</span>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button
            onClick={handleSignIn}
            className="bg-blue-900 cursor-pointer text-white w-full py-2 rounded-md hover:bg-blue-800 transition duration-300"
          >
            Sign In
          </button>

          <div className="flex cursor-pointer items-center justify-center ">
          </div>


          <button className="border cursor-pointer border-blue-900 text-blue-900 w-full py-2 rounded-md hover:bg-blue-100 transition duration-300">
            Sign in with other
          </button>

          <p className="text-sm select-none text-center text-gray-600">
            Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login_pg;



// import React, { useState } from 'react';

// const Login_pg = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     console.log('Email:', email);
//     console.log('Password:', password);
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <div className="flex flex-wrap justify-center items-center gap-10 p-10 min-h-screen bg-gradient-to-br from-blue-950 to-blue-700">
//       {/* Login Form */}
//       <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-6">
//         <h2 className="text-4xl font-extrabold text-center text-blue-900">Login</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleSignIn}
//           className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
//         >
//           Sign In
//         </button>
//       </div>

//       {/* Image Section */}
//       <div className="bg-white rounded-2xl shadow-2xl p-6 w-[300px] h-[300px] flex items-center justify-center">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
//           alt="Login Icon"
//           className="w-full h-full object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default Login_pg;
