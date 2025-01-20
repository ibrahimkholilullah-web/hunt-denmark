import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import googleImage from "../../../src/assets/Icon/google.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import { saveUser } from '../ImageBB/Utilist';
import toast from 'react-hot-toast';

const Login = () => {
  const { googleSignInUser, signUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // User login
      await signUser(email, password);
      toast.success('Login Successful', { position: 'top-left' });

      // Redirect user to the previous location or homepage
      const redirectPath = location?.state?.from?.pathname || "/";
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed", { position: 'top-center' });
    }
  };

  // const handleGoogleSignUp = async () => {
  //   try {
  //     const result = await googleSignInUser();
  //     await saveUser(result?.user);
  //     const redirectPath = location?.state?.from?.pathname || "/";
  //     navigate(redirectPath);
  //     toast.success("Google Sign Up Successful");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.message || "Google Sign Up failed");
  //   }
  // };

  return (
    <div className="flex min-h-screen justify-center items-center bg-[#F5F5F5] px-4">
      <div className="border-2 m-2 bg-slate-200 shadow-xl rounded-xl flex items-center justify-center w-full max-w-md">
        <div className="bg-opacity-80 px-8 border-2 border-[#3BB781] rounded-lg py-12 text-center w-full">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-[#3BB781] text-white w-16 h-16 rounded-full flex items-center justify-center">
              <FaUsers size={30} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                className="w-full px-4 py-2 rounded-md border border-[#3BB781] text-black focus:outline-none focus:ring-2 focus:ring-[#3BB781]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md border border-[#3BB781] text-black focus:outline-none focus:ring-2 focus:ring-[#3BB781]"
                required
              />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="mr-2 form-checkbox"
                />
                Remember me
              </label>
              <a href="#" className="hover:text-[#3BB781] text-black">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3BB781] hover:bg-[#3BB781] text-white py-2 rounded-md transition"
            >
              {loading ? (
                <span className="loading loading-spinner p-0 loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          {/* <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full border border-black hover:bg-[#3BB781] mt-2 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <img className="w-6" src={googleImage} alt="Google Logo" />
            Google Sign Up
          </button> */}
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
