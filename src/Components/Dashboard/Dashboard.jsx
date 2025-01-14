import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen container mx-auto bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r">
        <h1 className="text-2xl font-bold mb-6">BRESS</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center text-gray-700 font-medium">
                <span className="material-icons mr-2">dashboard</span> Dashboard
              </a>
            </li>
            <li>
                
            <NavLink className="flex items-center text-gray-700 font-medium" to='/dadhboard/myprofile'>My Profile</NavLink>

            </li>
            <li>
            <NavLink className="flex items-center text-gray-700 font-medium" to='/dadhboard/addProducts'>Add Product</NavLink>
            </li>
            <li>
            <NavLink className="flex items-center text-gray-700 font-medium" to='/dadhboard/myProducts'>My Products</NavLink>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 font-medium">
                <span className="material-icons mr-2">notifications</span> Notifications
                <span className="bg-green-500 text-white text-xs ml-2 px-2 py-0.5 rounded">2</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 font-medium">
                <span className="material-icons mr-2">chat</span> Chat
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-4">
            <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
            <div>
              <p className="text-sm font-medium">Emily Jonson</p>
              <p className="text-xs text-gray-500">jonson@bress.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded w-1/3 focus:outline-blue-500"
          />
          <div className="text-gray-500">Monday, 6th March</div>
          <div>
            <button className="px-4 py-2 border rounded mr-2">Card</button>
            <button className="px-4 py-2 border rounded">List</button>
          </div>
        </header>

        {/* Last Tasks */}
       <Outlet></Outlet>

        {/* Productivity */}
       
      </main>
    </div>
  );
};

export default Dashboard;
