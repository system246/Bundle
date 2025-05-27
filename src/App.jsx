import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Compo/Nav";
import Sidebar from "./Compo/Sidebar";
import Dasbrd from "./Bundle/Dasbrd";
import Category from "./Category/Category";
import AddCategory from "./Category/AddCategory";
import DumyValid from "./VAL/DumyValidity";
import AddDumyValidty from "./VAL/AddDumyval";
import DashTable from "./Bundle/DashTop/DashTop";
import 'antd/dist/reset.css';  
// import Dot1 from "./Scroll/Dot1";
import Opcodes from "./Operater/Opcodes";
import AddOpcode from "./Operater/AddOpcode";
import Home_Page from "./Dashboard/Home_Page";
import Login_pg from "./Login/Login_pg"
// import Simp from "./TEST/Simp";
// import Demo from "./TEST/Demo";
  
const App = () => {
  return (
    <Router>
      {/* <Login_pg/> */}
      <Nav />
      <Sidebar />
      <Routes>
        <Route path="/" element={ <Home_Page/>} />
        <Route path="/login" element={<Login_pg/>} />

        <Route path="/bundle" element={<Dasbrd />} />
        <Route path="/category" element={<Category />} />
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/Validity" element={<DumyValid />} />
        <Route path="/DashTable" element={<DashTable />} />
        <Route path="/AddValidity" element={<AddDumyValidty />} />
        <Route path="/Opcodes" element={ <Opcodes />}/>
        <Route path="/AddOpcode" element={<AddOpcode />} />
        {/* <Route path="/vert" element={<Dot1 />} /> */}
        {/* <Route path="/Simp" element={<Simp/>} /> */}
        {/* <Route path="/Demo" element={<Demo/>} /> */}
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
};

export default App;
