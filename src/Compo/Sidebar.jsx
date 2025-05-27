import { Empty } from "antd";
import React from "react";
import logo from "../assets/logo.png";
import { FaFile, FaFileAlt } from "react-icons/fa";
import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="pr-3 fixed bg-[#0f1e1e]">
      <div className="bar flex flex-col w-[170px] h-[100vh] px-3 py-6 gap-2">
        {[
          { label: "Dashboard", icon: <MdPendingActions />, path: "/" },
          { label: "Bundle", icon: <MdSpaceDashboard />, path: "/bundle", reload: true },
          { label: "Category", icon: <TbReportAnalytics />, path: "/Category" },
          { label: "Validity", icon: <FaFileAlt />, path: "Validity" },
          { label: "OPCODE", icon: <FaFile />, path: "/Opcodes" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-[16px] text-gray-100 font-sans cursor-pointer px-3 py-2 rounded-md hover:bg-[#324d4d] transition-colors duration-200"
            onClick={() => {
              navigate(item.path);
              if (item.reload) window.location.reload();
            }}
          >
            <span className="text-[17px]">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;




// import { Empty } from "antd";
// import React from "react";
// import logo from "../assets/logo.png";

// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed  bg-[#0f1e1e]">

//       <div className="bar flex flex-col  w-[170px] h-[100vh] px-3  ">
//         {/* <span className="text-white text-4xl py-3 font-bold ">axieva</span> */}

//         <div
//           className="Pending flex text-[16px] gap-3 text-gray-100  items-center font-sans   cursor-pointer border border-transparent rounded-sm hover:bg-[#324d4d]  pt-4"
//           onClick={() => navigate("/")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]" /> Dashboard
//         </div>

//         <div
//           className="Dashboard flex text-[16px] text-gray-100 gap-3 items-center font-sans cursor-pointer py-4 "
//           onClick={() => {
//             navigate("/bundle"); // navigate first
//             window.location.reload(); // force reload
//           }}
//         >
//           <MdSpaceDashboard  className="text-[17px]"/> Bundle
//         </div>

//         <div
//           className="Reports flex text-[16px] text-gray-100 gap-3 items-center font-sans     cursor-pointer "
//           onClick={() => navigate("/Category")}
//         >
//           <TbReportAnalytics className="text-[17px]" /> Category
//         </div>

//         <div
//           className="Pending flex text-[16px] text-gray-100 gap-3  items-center font-sans cursor-pointer py-4"
//           onClick={() => navigate("Validity")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]"/> Validity
//         </div>

//         <div
//           className="Pending flex text-[16px] gap-3 text-gray-100  items-center font-sans   cursor-pointer   "
//           onClick={() => navigate("/Opcodes")} // Navigate to Pending
//         >
//           <MdPendingActions className="text-[17px]"/> OPCODE
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





// import { Empty } from "antd";
// import React from "react";
// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed">
//       <div className="bar flex flex-col w-[180px] h-[100vh] px-3    bg-gray-400   ">

//        <div
//         className="Dashboard flex text-[20px] gap-3 items-center font-semibold cursor-pointer py-2 my-1"
//         onClick={() => {
//           navigate("/");       // navigate first
//           window.location.reload();  // force reload
//         }}
//       >
//         <MdSpaceDashboard /> Bundle
//       </div>

//         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
//         onClick={() => navigate('/Category')}>
//           <TbReportAnalytics /> Category
//         </div>

//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
//          onClick={() =>navigate('Validity')}  // Navigate to Pending
//         >
//           <MdPendingActions /> Validity
//         </div>

//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div> */}
//          <div
//           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div>
//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Simp')}  >
//           <MdPendingActions /> Simp
//          </div>
//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Demo')}  >
//           <MdPendingActions /> Demo
//          </div> */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import { Empty } from "antd";
// import React from "react";
// import logo from "../assets/logo.png"

// import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// import { TbReportAnalytics } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";  // Import useNavigate

// const Sidebar = () => {
//   const navigate = useNavigate(); // Initialize navigation function

//   return (
//     <div className="pr-3  fixed  bg-[#0f1e1e]

// ">

//       <div className="logo">
//                     {/* <img src={logo} alt="" className='h-[30px]' /> */}

//       </div>

//       <div className="bar flex flex-col items-center w-[180px] h-[100vh] px-3      ">

//         <span className="text-white text-4xl py-3 font-bold ">axieva</span>

//        <div
//         className="Dashboard flex text-[20px] text-gray-100 gap-3 items-center font-semibold cursor-pointer py-2 my-1"
//         onClick={() => {
//           navigate("/");       // navigate first
//           window.location.reload();  // force reload
//         }}
//       >
//         <MdSpaceDashboard /> Bundle
//       </div>

//         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
//         onClick={() => navigate('/Category')}>
//           <TbReportAnalytics /> Category
//         </div>

//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
//          onClick={() =>navigate('Validity')}  // Navigate to Pending
//         >
//           <MdPendingActions /> Validity
//         </div>

//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div> */}
//          <div
//           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
//         >
//           <MdPendingActions /> OPCODE
//         </div>
//         {/* <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Simp')}  >
//           <MdPendingActions /> Simp
//          </div>
//           <div
//           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
//          onClick={() =>navigate('/Demo')}  >
//           <MdPendingActions /> Demo
//          </div> */}

//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// // import { Empty } from "antd";
// // import React from "react";
// // import { MdPendingActions, MdSpaceDashboard } from "react-icons/md";
// // import { TbReportAnalytics } from "react-icons/tb";
// // import { useNavigate } from "react-router-dom";  // Import useNavigate

// // const Sidebar = () => {
// //   const navigate = useNavigate(); // Initialize navigation function

// //   return (
// //     <div className="pr-3  fixed">
// //       <div className="bar flex flex-col w-[180px] h-[100vh] px-3    bg-gray-400   ">

// //        <div
// //         className="Dashboard flex text-[20px] gap-3 items-center font-semibold cursor-pointer py-2 my-1"
// //         onClick={() => {
// //           navigate("/");       // navigate first
// //           window.location.reload();  // force reload
// //         }}
// //       >
// //         <MdSpaceDashboard /> Bundle
// //       </div>

// //         <div className="Reports flex text-[20px] gap-3 items-center font-semibold     cursor-pointer   mb-1"
// //         onClick={() => navigate('/Category')}>
// //           <TbReportAnalytics /> Category
// //         </div>

// //           <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold cursor-pointer py-2   mb-1"
// //          onClick={() =>navigate('Validity')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> Validity
// //         </div>

// //         {/* <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Add_OPCODE')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> OPCODE
// //         </div> */}
// //          <div
// //           className="Pending flex text-[18px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Opcodes')}  // Navigate to Pending
// //         >
// //           <MdPendingActions /> OPCODE
// //         </div>
// //         {/* <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Simp')}  >
// //           <MdPendingActions /> Simp
// //          </div>
// //           <div
// //           className="Pending flex text-[20px] gap-3  items-center font-semibold   cursor-pointer   mb-1"
// //          onClick={() =>navigate('/Demo')}  >
// //           <MdPendingActions /> Demo
// //          </div> */}

// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
