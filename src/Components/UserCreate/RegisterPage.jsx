import React, { useState } from "react";
import useAuth from "../AuthProvider/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { imageUpload, saveUser } from "../ImageBB/Utilist";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import googleImage from "../../assets/Icon/google.png";

const RegisterPage = () => {
  const { createUser, loading, updateUser,googleSignInUser } = useAuth();
  const [passwordIcon, setPasswordIcon] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const name = data.name;
      const email = data.email;
      const password = data.password;

      // Ensure an image is uploaded
      if (!data.image || data.image.length === 0) {
        alert("Please upload a profile image!");
        return;
      }

      const imageFile = data.image[0];
      const photoUrl = await imageUpload(imageFile);

      // Create user and update their profile
      const result = await createUser(email, password);
      await updateUser(name, photoUrl);

      // Save user details to the database
      await saveUser({ ...result?.user, displayName: name, photoUrl });

      console.log("User created:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err.message);
    }
  };
 const habdleGoogleSignUp = async () =>{
        try{
        const data= await  googleSignInUser()
        await saveUser(data?.user)
        
          console.log("google Sign Up")
           // Close the modal
           document.getElementById("my_modal_3").close();
        }catch(err){
          console.log(err.message)
        }
      }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="grid grid-cols-1 mx-2 border shadow-2xl md:grid-cols-2 max-w-5xl w-full bg-gray-800 rounded-xl overflow-hidden shadow-black">
        {/* Left Image Section */}
        <div className="hidden md:flex justify-center relative items-center bg-black/35">
          <iframe
            className="mx-auto h-96 w-full max-w-md"
            src="https://lottie.host/embed/6810e110-5b14-4e55-b878-118bb8246ac8/DDkNpNRhIK.lottie"
          ></iframe>
          <Link
            to="/"
            className="absolute rounded-xl bg-[#111827] text-2xl font-bold w-6/12 justify-center flex border-b-2 border-l-2 py-2 text-white md:left-1/4 md:bottom-10"
          >
            Home
          </Link>
        </div>

        {/* Right Form Section */}
        <div className="bg-gray-900 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl text-center border-b-2 w-40 mx-auto border-r-2 rounded-xl p-2 font-semibold mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-yellow-400 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-yellow-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={passwordIcon ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Password must have one uppercase, one lowercase, one number, and one special character",
                  },
                })}
              />
              {errors.password && (
                <span className="text-yellow-400 text-sm">
                  {errors.password.message}
                </span>
              )}
              <button
                className="absolute top-10 right-5"
                onClick={() => setPasswordIcon(!passwordIcon)}
                type="button"
              >
                {passwordIcon ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* File Input */}
            <div>
              <label className="form-control text-white w-full">
                <div className="label">
                  <span className="label-text">Pick a file</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Photo is required" })}
                  className="file-input file-input-bordered bg-[#111827] border-white hover:border-yellow-400 border-2"
                />
                {errors.image && (
                  <span className="text-yellow-400">{errors.image.message}</span>
                )}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium transition"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Google Sign Up */}
          <button 
          onClick={habdleGoogleSignUp}
            type="button"
            className="w-full bg-slate-900 text-white hover:bg-[#1F2937] border-white border-2 mt-2 py-2 rounded-lg font-medium transition"
          >
            <img
              className="w-8 inline-flex items-center mr-10"
              src={googleImage}
              alt="Google"
            />
            Google Sign Up
          </button>

          {/* Mobile Login Link */}
          <h1 className="md:hidden block mt-2 text-left">
            Log in to your account?{" "}
            <Link to="/" className="text-yellow-400">
              Home
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
