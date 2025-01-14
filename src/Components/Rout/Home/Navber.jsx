import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaHome, FaRegUser } from 'react-icons/fa'
import useAuth from '../../AuthProvider/useAuth'
import Login from '../../UserCreate/Login'

const Navbar = () => {
  const { user, signOutUser } = useAuth()

  const pathName = (
    <>
      <li>
        <NavLink
          to="/"
          
        >
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
         
        >
          All Products
        </NavLink>
      </li>
     
    </>
  )

  return (
    <div className="navbar w-11/12 mx-auto font-bold lg:px-10 uppercase fixed z-10 bg-white py-4 mb-4 ">
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
            className="menu menu-sm bg-[#302E2F] border border-white dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {pathName}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost md:text-xl uppercase">Products Hunt</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal gap-3 px-1 hidden items-center lg:flex">
          {pathName}
        </ul>
        {!user && (
          <Link onClick={()=>document.getElementById('my_modal_3').showModal()} className="mr-4 border-b-2">
            Login
          </Link>
        )}
        {user && (
          <div className="dropdown dropdown-hover relative">
          <div tabIndex={0} role="button" className="flex items-center">
            <img
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 p-[2px] border-[#D98855]"
              src={user?.photoURL || 'defaultAvatar.png'}
            />
          </div>
          <ul
              tabIndex={0}
              className="dropdown-content text-center text-sm w-52 bg-white border-2 border-white absolute right-0  rounded-box z-10 p-2 shadow"
            >
              <div>
                <img
                  src={user.photoURL}
                  className="w-10 h-10 mx-auto rounded-full"
                  alt="User Profile"
                />
                <div className='mt-2'>
                  <li><p className="w-full">{user.displayName || 'Anonymous'}</p></li>
                </div>
              </div>
              <li className='border-2 rounded-lg'><Link to='/dadhboard'>Dashboard</Link></li>
              <li className="mt-1">
                <Link
                  to="/"
                  onClick={signOutUser}
                  className="block border-2 rounded-lg text-center"
                >
                  Logout
                </Link>
              </li>
            </ul>

        </div>
        )}
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
       <Login></Login>
    </div>
  )
}

export default Navbar
