import React from 'react';
import {motion} from "framer-motion"
import {fadeIn}  from "../../Components/Animation/variants"
const Section = ({ titel, description }) => {
  return (
    <motion.div
    variants={fadeIn('up', 0.2)}
    initial='hidden'
    whileInView={'show'}
    viewport={{once: false,amount: 0.7}}
     className="py-8 px-4 md:py-12 lg:py-16 mx-auto text-center">
      <p className="text-gray-500 text-base style-new sm:text-lg md:text-xl lg:text-2xl font-bold">
        --- {titel} ---
      </p>
      <h1 className="text-2xl varela sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3BB77E] my-2">
        {description}
      </h1>
    </motion.div>
  );
};

export default Section;
