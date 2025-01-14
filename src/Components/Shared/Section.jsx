import React from 'react';

const Section = ({titel, description}) => {
    return (
        <div className='my-16 mx-auto text-center'>
            <p>---{titel}---</p>
            <h1 className='text-3xl font-bold'>{description}</h1>
        </div>
    );
};

export default Section;