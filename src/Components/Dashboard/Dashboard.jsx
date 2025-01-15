import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';

const Dashboard = () => {
  const {user} = useAuth()
  return (
    <div className="min-h-screen container mx-auto bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 border-r">
        <h1 className="text-2xl font-bold mb-6">Products Hunt</h1>
        <nav>
          <ul className="space-y-4">
            
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
        <div className=" fixed bottom-4">
          <div className="flex items-center space-x-4">
            <img src={user?.photoURL} alt="User" className="rounded-full w-10 h-10" />
            <div>
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
         
          <div className='flex  gap-10 items-center'>
            <Link to='/' className="px-4 py-2 border rounded mr-2">Home</Link>
            <img src={user?.photoURL} alt="User" className="rounded-full w-10 h-10" />
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
