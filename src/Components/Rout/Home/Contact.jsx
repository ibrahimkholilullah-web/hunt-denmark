import React from "react";
import Section from "../../Shared/Section";
import {motion} from "framer-motion"
import {fadeIn}  from "../../Animation/variants"
const Contact = () => {
  return (
    <div className="bg-[#F5F5F5] varela">
      <Section titel="Hudn Menmark" description="Contact Us"></Section>
      <div className="bg-[#F5F5F5] pb-20 px-6 container mx-auto">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
          variants={fadeIn('left', 0.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false,amount: 0.7}}
          className="text-[#253D4E] max-w-2xl mx-auto">
            We’d love to hear from you! Whether you’re a product creator, an
            enthusiast, or just exploring, we’re here to answer your questions
            and help you make the most of your experience.
          </motion.p>
        </div>

        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <motion.div
          variants={fadeIn('right', 0.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false,amount: 0.7}}
          className="space-y-6">
            <div>
              <p className="font-bold text-lg">Message Us Directly</p>
              <p className="text-[#253D4E]">
                Got a quick question or feedback? Use the form provided here.
                Share your name, email, and message, and we’ll get back to you
                as soon as possible.
              </p>
            </div>

            <div className="flex items-center">
              <div className="text-blue-500 text-2xl">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <p className="font-bold text-lg">Address</p>
                <p className="text-[#253D4E]">
                  4271 Sage Camp Road, Daytona, Minnesota, 55006
                </p>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="text-blue-500 text-2xl">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div>
                <p className="font-bold text-lg">Phone</p>
                <p className="text-[#253D4E]">917-897-2321</p>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="text-blue-500 text-2xl">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="font-bold text-lg">Email</p>
                <p className="text-[#253D4E]">ibrahimkholilt56@gmail.com</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
          variants={fadeIn('left', 0.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false,amount: 0.7}}
          className="bg-white border border-[#3BB781] p-6 rounded-xl shadow-md">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-[#3BB781] rounded-lg focus:ring focus:ring-[#3BB781]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Type your Message...
                </label>
                <textarea
                  placeholder="Enter your message"
                  rows="3"
                  className="w-full p-3 border border-[#3BB781] rounded-lg focus:ring focus:ring-[#3BB781]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3BB781] text-white font-bold py-3 rounded-lg hover:bg-[#2e8b65] transition"
              >
                Send
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
