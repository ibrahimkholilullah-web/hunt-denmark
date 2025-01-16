import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import userRole from '../hooks/userRole';

const Dashboard = () => {
  const {user} = useAuth()
  const [role,isLoading] = userRole()
  return (
   <div className='bg-[#F5F5F5] min-h-screen'>
          <div className=' flex justify-between items-center w-11/12  py-4 rounded-2xl'>
          <div>
          </div>
          <div className=' flex items-center gap-5'>
          <div>
              <p className="text-sm font-medium">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          <img src={user?.photoURL} alt="User" className="rounded-full w-10 h-10" />
          
            </div>
          </div>

     <div className=" w-11/12 mx-auto bg-[#E2E2E2] px-2 pb-2 rounded-xl flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-3xl mt-5 p-4 border-r">
        <Link to='/' className="text-2xl font-bold mb-6">Products Hunt</Link>
        <nav>
          <ul className="space-y-4">
            
           {
            role === "users" && <>
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
            </ul>
            </>
           }
           {
            role === "modarator" && <>
            <ul className="space-y-4">
            <li>
            <NavLink className="flex items-center text-gray-700 font-medium" to='/dadhboard/review'>Product Review</NavLink>
            </li>
            <li>
            <NavLink className="flex items-center text-gray-700 font-medium" to='/dadhboard/report'>Reported Contents</NavLink>
            </li>
            </ul>
            </>
           }

           
          </ul>
        </nav>
        <div className=" fixed bottom-4">
          <div className="flex items-center space-x-4">
            
           
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
         
        </header>

        {/* Last Tasks */}
       <Outlet></Outlet>

        {/* Productivity */}
       
      </main>
    </div>
   </div>
  );
};

export default Dashboard;
