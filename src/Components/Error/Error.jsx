import React from 'react';
import imageError from "../../assets/Image/Error.webp";
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div>
      <img
        className="w-full rounded-lg max-w-lg object-contain"
        src={imageError}
        alt="Error Page"
      />
      <Link to='/' className='btn mt-3 w-4/12 varela bg-[#3BB895] mx-auto flex text-white'>Home Page</Link>
      </div>
    </div>
  );
};

export default Error;
