import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaHome, FaRegUser } from 'react-icons/fa'
import useAuth from '../../AuthProvider/useAuth'
import userRole from '../../hooks/userRole'

const Navbar = () => {
  const { user, signOutUser } = useAuth()
  const [role,isLoading] = userRole()
  const pathName = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-[#3BB77E] hover:bg-none rounded-none text-whit pb-1 "
              : "hover:border-b-2 hover:border-[#3BB77E] hover:rounded-none"
          }
        >
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-[#3BB77E] hover:bg-none rounded-none text-whit pb-1 "
              : "hover:border-b-2 hover:border-[#3BB77E] hover:rounded-none"
          }
        >
          All Products
        </NavLink>
      </li>
     
    </>
  )

  return (
    <div className="navbar constiner mx-auto font-bold lg:px-11 uppercase fixed z-10 bg-[#BCE3C9] py-6 mb-4 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm bg-[#BCE3C9] border border-white dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {pathName}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost varela text-[#3BB77E] md:text-3xl uppercase">HUND <span className='text-[#253D4E]'>Denmark</span></NavLink>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal varela mr-5 gap-3 px-1 hidden items-center lg:flex">
          {pathName}
        </ul>
        {!user && (
          <Link to="/login" className="mr-4 text-white hover:border hover:border-black hover:bg-[#BCE3C9] px-8 bg-[#3BB77E] btn rounded-none">
            Login
          </Link>
        )}
        {user && (
          <div className="dropdown dropdown-hover relative">
          <div tabIndex={0} role="button" className="flex items-center">
            <img
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 p-[2px] border-[#3BB77E]"
              src={user?.photoURL || 'defaultAvatar.png'}
            />
          </div>
          <ul
              tabIndex={0}
              className="dropdown-content text-center text-sm w-52 bg-[#BCE3C9] border-2 text-white border-white absolute right-0  rounded-box z-10 p-2 shadow"
            >
              <div>
                <img
                  src={user.photoURL}
                  className="w-10 h-10 mx-auto rounded-full"
                  alt="User Profile"
                />
                <div className='mt-2'>
                  <li><p className="w-full text-[#253D4E] ">{user.displayName || 'Anonymous'}</p></li>
                </div>
              </div>
              <li className='border-2 rounded-lg bg-[#3BB77E]'>
                <Link to={role === 'users' ? "/dadhboard/myprofile" : role === 'modarator' ? "/dadhboard/review": '/dadhboard/statistics'}>
                  Dashboard
                </Link>
              </li>

              <li className="mt-1">
                <Link
                  to="/"
                  onClick={signOutUser}
                  className="block border-2 bg-[#3BB77E] rounded-lg text-center"
                >
                  Logout
                </Link>
              </li>
            </ul>

        </div>
        )}
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
    </div>
  )
}

export default Navbar
