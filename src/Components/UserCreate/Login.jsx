import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import googleImage from "../../../src/assets/Icon/google.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import { saveUser } from '../ImageBB/Utilist';
import toast from 'react-hot-toast';

const Login = () => {
    const {googleSignInUser,signUser} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const handleSubmit =async (e) => {
       
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        // Add login logic here
        try {
          //User Login
          await signUser(email, password)
            // Close the modal
            document.getElementById("my_modal_3").close();
          navigate(location?.state ? location?.state : "/")
          
         
           toast.success('Login Successful',{
            position: 'top-left'
           })
        } catch (err) {
          console.log(err)
          toast.error(err?.message, {
            position: 'top-center'
          })
        }

      
      };
      const habdleGoogleSignUp = async () =>{
        try{
        const data= await  googleSignInUser()
        await saveUser(data?.user)
        
          
           // Close the modal
           document.getElementById("my_modal_3").close();
           navigate(location?.state ? location?.state : "/")
           toast.success("google Sign Up", {
            position: 'top-left'
           })
        }catch(err){
          toast.error(err.message, {
            position: 'top-center'
          })
        }
      }
    return (
        <div>
           <dialog id="my_modal_3" className="modal">
             <div className="modal-box">
             {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
               <form method="dialog">
                 <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
               </form>
               <div className=" border-2  m-2 bg-slate-200 shadow-xl rounded-xl flex items-center justify-center ">
      <div className=" bg-opacity-80  px-8 py-12 w-96 text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="bg-gray-700 border text-white w-16 h-16  rounded-full flex items-center justify-center">
          <FaUsers size={30} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              name='email'
              className="w-full px-4 py-2 rounded-md border border-gray-600 text-black  focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name='password'
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md border border-gray-600 text-black  focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 form-checkbox text-purple-800"
              />
              Remember me
            </label>
            <a href="#" className="hover:text-purple-700">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <button 
        onClick={habdleGoogleSignUp}
          type="submit"
          className="w-full border border-black hover:bg-[#1F2937]  mt-2 py-1 rounded-lg font-medium transition"
        >
         <img className="w-8 inline-flex items-center mr-5" src={googleImage} alt="" />
         Google Sign Up
        </button>
        <p className="text-sm  mt-4">
          Don't have an account? <Link to="/register" href="#" className="text-indigo-700 hover:underline">Register</Link>
        </p>
      </div>
             </div>
             </div>
           </dialog>
        </div>
    );
};

export default Login;