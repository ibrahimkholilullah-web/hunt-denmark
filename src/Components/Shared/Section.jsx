import React from 'react';

const Section = ({ titel, description }) => {
  return (
    <div className="py-8 px-4 md:py-12 lg:py-16 mx-auto text-center">
      <p className="text-gray-500 text-base style-new sm:text-lg md:text-xl lg:text-2xl font-bold">
        --- {titel} ---
      </p>
      <h1 className="text-2xl varela sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3BB77E] my-2">
        {description}
      </h1>
    </div>
  );
};

export default Section;
