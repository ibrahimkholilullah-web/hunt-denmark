import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import userRole from '../hooks/userRole';

const Dashboard = () => {
  const { user } = useAuth();
  const [role, isLoading] = userRole();

  const activeLinkClass = "text-black hover:bg-[#E8F5E9] border-2 font-bold btn bg-[#3BB77F] w-full";
  const defaultLinkClass = "text-black hover:bg-[#E8F5E9] border-2 hover:text-blue-400 btn bg-[#3BB77F] w-full";

  return (
    <div className="bg-[#BCE3C9] min-h-screen varela">
      {/* Header */}
      <div className="flex justify-between items-center w-11/12 mx-auto py-4 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <p className="text-sm font-medium">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <img
            src={user?.photoURL || '/placeholder-avatar.png'}
            alt="User"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-11/12 mx-auto bg-green-200 px-2 pb-2 rounded-xl flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-green-50 rounded-3xl mt-2 p-4 border-r shadow-sm">
          <Link to="/" className="text-2xl font-bold mb-6 block text-center">
          HUND Denmark
          </Link>
          <nav>
            <ul className="space-y-4">
              {role === "users" && (
                <>
                  <li>
                    <NavLink
                      to="/dadhboard/myprofile"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dadhboard/addProducts"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Add Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dadhboard/myProducts"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      My Products
                    </NavLink>
                  </li>
                </>
              )}
              {role === "modarator" && (
                <>
                  <li>
                    <NavLink
                      to="/dadhboard/review"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Product Review
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dadhboard/report"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Reported Contents
                    </NavLink>
                  </li>
                </>
              )}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dadhboard/statistics"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Statistics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dadhboard/manageuser"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dadhboard/cupons"
                      className={({ isActive }) =>
                        isActive ? activeLinkClass : defaultLinkClass
                      }
                    >
                      Manage Cupons
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 container mx-auto mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
