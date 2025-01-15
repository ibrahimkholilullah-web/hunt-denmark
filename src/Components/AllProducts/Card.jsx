import React from 'react';
import { TbHandClick } from 'react-icons/tb';

const Card = ({card}) => {
    const { productName,
        productsImg,
        description,
        tags,
        externalLink,
        ownerImage,
        ownerName,
        ownerEmail,
        upvote,
        vote,
        status} = card
    return (
        <div className="card border-2 p-2 card-compact bg-[#E9E9E9] shadow-xl">
        <figure>
          <img 
            className='h-64 w-full border-2 rounded-xl object-cover'
            src={productsImg}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <div className='flex items-center justify-between'>
          <h2 className="card-title">{productName}</h2>
          <h2 className='flex items-center gap-2 bg-[#54673B] w-16 justify-center text-white p-1 rounded-lg'> <TbHandClick size={20} />
          {upvote}</h2>
          </div>
          <p className='text-brown-800'>{description.slice(0,80)}</p>
          <p className=' bg-blue-gray-50'># {tags}</p>
          
        </div>
      </div>
    );
};

export default Card;