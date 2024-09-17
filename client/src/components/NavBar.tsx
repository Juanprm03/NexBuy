import React from 'react';
import { FaSearch, FaUser, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import './index.css';

const NavBar = () => {
  return (
    <div className="p-2.5 flex">
      <div className="p-5 flex w-full justify-between items-center">
        <div className="h-15 bg-white text-black text-center text-sm cursor-pointer">
          EN
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-black text-white rounded p-1 mx-6">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none px-4 py-2 bg-black text-white rounded-b-full w-64"
            />
            <FaSearch className="text-white" />
          </div>
        </div>
        <div className="h-15 bg-white text-black flex-1 text-center font-island-moments text-6xl font-bold">
          NexBuy
        </div>
        <div className="h-15 bg-white text-black flex flex-1 justify-end items-center space-x-4">
          <FaUser className="text-xl cursor-pointer" title="Login" />
          <FaUserPlus className="text-xl cursor-pointer" title="Register" />
          <FaShoppingCart className="text-xl cursor-pointer" title="Cart" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;