import React, { useState } from 'react';
import { FaHouseFloodWaterCircleArrowRight } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  

  return (
    <div className="container mx-auto flex gap-10 min-h-screen">
     <div className='w-3/12 bg-blue-gray-400 fixed z-10 min-h-screen '>
     <ul className='space-y-4 px-4 uppercase py-10 text-black'>
        <li><NavLink to='/dadhboard/myprofile'>My Profile</NavLink></li>
        <li><NavLink to='/dadhboard/addProducts'>Add Product</NavLink></li>
        <li><NavLink to='/dadhboard/myProducts'>My Products</NavLink></li>
        <li><NavLink>Product Review Queue</NavLink></li>
        <li><NavLink>Reported Contents</NavLink></li>
        <li><NavLink>Statistics Page.</NavLink></li>
        <li><NavLink>Manage Users</NavLink></li>
        <li><NavLink>Manage Coupons.</NavLink></li>
    </ul>
     </div>
     <div className='w-9/12 ml-96'>
        <Outlet></Outlet>
     </div>
  </div>
  
  );
};

export default Dashboard;
