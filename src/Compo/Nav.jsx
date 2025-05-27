import React from 'react'
import { CgProfile } from "react-icons/cg";
import logo from "../assets/logo.png"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className='py-1 bg-gray-100 shadow-lg px-3  '>
       
       <div className="nav flex justify-between bg-transparent items-center ">
       <div className="left py-2 ">
            <img src={logo} alt="" className='h-[30px]' />
        </div>
        <button className="right cursor-pointer flex items-center gap-2 bg-transparent px-2 py-1 rounded-md hover:bg-gray-300">
            <CgProfile className='text-2xl bg-transparent px-0' onClick={()=>navigate("/login")} />     
         </button>
        </div>
      
    </div>
  )
}

export default Nav
