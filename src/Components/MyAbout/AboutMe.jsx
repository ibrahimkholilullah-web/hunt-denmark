import React from "react";
import aboutImag from "../../assets/Image/about.jpg"
const AboutMe = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] varela flex items-center justify-center">
     <div className=" max-w-4xl mx-auto rounded-lg bg-blue-gray-50 shadow-md p-8">
     <div className=" flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center items-center">
            {/* Placeholder for the silhouette image */}
            <div className="h w-full flex items-center justify-center">
              <img className=" rounded-lg " src={aboutImag} alt="" />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full sm:w-1/2 px-6 mt-6 sm:mt-0 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          
          <p className="text-gray-600 mt-4">
          At Products Hunt, we are passionate about discovering and showcasing innovative products from creators around the globe. Our platform connects inventors, entrepreneurs, and enthusiasts, enabling them to share groundbreaking ideas and gain exposure to a global audience.
          </p>
         

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start mt-6 space-x-4 text-pink-600">
            <a href="#" className="hover:text-pink-800">
              <i className="fab fa-behance"></i>
            </a>
            <a href="#" className="hover:text-pink-800">
              <i className="fab fa-dribbble"></i>
            </a>
            <a href="#" className="hover:text-pink-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-800">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          
        </div>
      </div>
        <h1 className="mt-4">Whether you’re looking for the next big tech gadget, an innovative app, or lifestyle products that solve everyday challenges, Products Hunt is your ultimate destination. We aim to bring together a community that thrives on curiosity, creativity, and collaboration.</h1>
        <h1>Our mission is simple: to celebrate innovation and empower creators to shine. By offering a space where the latest and greatest products are shared, reviewed, and discussed, we help creators gain visibility and users find solutions they never knew they needed.</h1>
        <h1>Join our thriving community of explorers and innovators. Discover products that inspire, vote for your favorites, and share your insights with the world. At Products Hunt, your curiosity drives the future of innovation.</h1>
        <h1>Thank you for being part of our journey to uncover the extraordinary. Together, we’re shaping a world of limitless possibilities, one product at a time.</h1>
     </div>
      
    </div>
  );
};

export default AboutMe;
