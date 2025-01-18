import axios from 'axios';
import React, { useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { TbHandClick } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import toast from 'react-hot-toast';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

const Card = ({ card  }) => {

  const {
    productName,
    productsImg,
    description,
    tags,
    ownerEmail,
    upvote,
    _id,
  } = card;

  
  return (
    <div className="card relative border-2 p-2 card-compact bg-[#E9E9E9] shadow-xl">
      <figure>
        <img
          className="h-64 w-full border-2 rounded-xl object-cover"
          src={productsImg}
          alt={productName}
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{productName}</h2>
          <button
            className="flex items-center gap-2 cursor-pointer bg-[#54673B] w-16 justify-center text-white p-1 rounded-lg"
          >
            <MdOutlineSupervisorAccount />

            {upvote}
          </button>
        </div>
        <p className="text-brown-800">{description.slice(0, 80)}...</p>
        <p className="bg-blue-gray-50 px-2 py-1 rounded-full text-sm">#{tags}</p>
      </div>
      <Link to={`/ditails/${_id}`} className="absolute right-5 bottom-5">
        <BiCommentDetail size={25} />
      </Link>
    </div>
  );
};

export default Card;
