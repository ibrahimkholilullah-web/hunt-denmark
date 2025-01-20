import React, { useState } from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaClover } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading';
import bgImage from '../../../assets/Image/pexels-hannaauramenka-8409851.jpg';
import { LuArrowUpWideNarrow, LuMousePointerClick } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../AuthProvider/useAuth';
import { FaRegThumbsUp } from "react-icons/fa";
import {motion} from "framer-motion"
import {fadeIn}  from "../../Animation/variants"
const Featured = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const [votedProducts, setVotedProducts] = useState({});

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products`);
      return data;
    },
  });


  const handleUpvote = async (id,email) => {
    if(!user){
      navigate("/login")
    }
    if(user?.email === email){
      return toast.error('Your are a Not Like this Products .')
  }
    const action = votedProducts[id] ? 'decrement' : 'increment';
    try {
      await axios.patch(`${import.meta.env.VITE_PROJECT_APT}/upVited/${id}`, { action });
      setVotedProducts((prev) => ({
        ...prev,
        [id]: action === 'increment',
      }));
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#F5F5F5] py-6">
    <div className="container mx-auto bg-[#F5F5F5] md:pb-24 px-4 md:px-0">
      <Section titel="New Add Products" description="Featured Products" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.slice(0, 4).map((product) => (
          <motion.div
          variants={fadeIn('left', 0.2)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false,amount: 0.7}}
            key={product._id}
            className="border-2 hover:bg-brown-50 border-[#54673B] rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Product Image and Name */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                className="w-16 h-16 border border-[#54673B] rounded-full object-cover"
                src={product.productsImg}
                alt={product.productName}
              />
              <div className="flex flex-col">
                <Link
                  to={`/ditails/${product._id}`}
                  className="font-semibold varela items-center gap-2 hover:text-red-500 flex"
                >
                  {product.productName}
                  <LuMousePointerClick />
                  <span className='text-[12px] bg-amber-200 px-1 rounded-3xl'>New </span>
                </Link>
                <p className="bg-gray-200 style-new text-sm text-[#54673B] text-center px-2 rounded-full inline-block mb-3">
                  #{product.tags}
                </p>
              </div>
            </div>
  
            {/* Upvote Section */}
            <div className="flex justify-between items-center text-sm w-full md:w-auto">
              <div className="flex items-center gap-2 text-lg">
                <span className="font-bold varela">{product.upvote}</span>
                <LuArrowUpWideNarrow
                  size={25}
                  onClick={() => handleUpvote(product._id, product.ownerEmail)}
                  className={`cursor-pointer ${
                    votedProducts[product._id] ? 'text-green-500' : 'text-gray-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Featured;
