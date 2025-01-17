import React from 'react';

const Section = ({titel, description}) => {
    return (
        <div className='py-16 mx-auto text-center'>
            <p className='text-[#B6B6B6] text-xl style-new font-bold'>---{titel}---</p>
            <h1 className='text-4xl font-bold text-[#3BB77E] my-2 varela'>{description}</h1>
        </div>
    );
};

export default Section;

