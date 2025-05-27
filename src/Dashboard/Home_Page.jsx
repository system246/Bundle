import React from 'react';
import useBundleStats from './BundleState_hook'; // adjust path as needed
import { FaCircleCheck,FaCircleXmark  } from "react-icons/fa6";
import { AiFillFileText } from "react-icons/ai";



const Home_Page = () => {
  const { stats, loading, error } = useBundleStats();

  return (
    <div className="relative ml-50 px-4 my-3 border border-gray-200 rounded-lg bg-white shadow-md m-2 pb-[10vh]">
      <h1 className="text-2xl text-gray-500 py-3">DashBoard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="box_cont grid-cols-3 grid border  rounded-[16px] border-transparent gap-4">
          {/* Total Bundle */}
          <div className="box flex border border-gray-200  text-center rounded-[10px] shadow-lg">
            <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
              <AiFillFileText className="bg-zinc-900 text-white rounded-full p-1 h-[30px] w-[30px]" />
            </div>
            <div className="txt flex items-center justify-center px-3">
              <h1 className="text-xl text-start font-mono">
                Total Bundle <br />
                <span>{stats.total}</span>
              </h1>
            </div>
          </div>

          {/* Active Bundle */}

          <div className="box flex border  border-gray-200 text-center rounded-[10px] shadow-lg">
            <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
              < FaCircleCheck className="text-white rounded-full p-1 bg-green-500 h-[30px] w-[30px]" />
            </div>
            <div className="txt  text-center px-3">
              <h1 className="text-xl text-start font-mono">
                Active Bundle <br />
                <span>{stats.active}</span>
              </h1>
            </div>
          </div>

          {/* Inactive Bundle */}
          <div className="box flex border border-gray-200  text-center rounded-[10px] shadow-lg">
            <div className="logo flex items-center justify-center bg-zinc-200 px-6 rounded-l-[10px]">
              <FaCircleXmark  className="text-white bg-red-500 rounded-full p-1 h-[30px] w-[30px]" />
            </div>
            <div className="txt flex items-center justify-center px-3">
              <h1 className="text-xl text-start font-mono">
                InActive Bundle <br />
                <span>{stats.inactive}</span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home_Page;
