import React, { useState } from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaClover } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading';
import bgImage from '../../../assets/Image/pexels-hannaauramenka-8409851.jpg';
import { LuMousePointerClick } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../AuthProvider/useAuth';

const Featured = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products`);
      return data;
    },
  });

  const [votedProducts, setVotedProducts] = useState({});

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
    <div className=' container mx-auto '>
      <Section titel="New Add Products" description="Featured Products" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="border-2 hover:bg-brown-50 border-[#54673B] rounded-lg p-4 overflow-hidden flex justify-between items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-5">
              <img
                className="w-16 h-16 border border-[#54673B] rounded-full object-cover"
                src={product.productsImg}
                alt={product.productName}
              />
              <div className='flex-col'>
                <Link to={`/ditails/${product._id}`} className="font-semibold items-center gap-2 hover:text-red-500 flex">{product.productName}<LuMousePointerClick />
                </Link>
                <p className="bg-gray-200 text-sm text-[#54673B] text-center px-2 rounded-full inline-block mb-3">
                  #{product.tags}
                </p>
              </div>
            </div>
            <div className="justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-lg">
                <span className="font-bold">{product.upvote}</span>
                <FaClover
                  size={25}
                  onClick={() => handleUpvote(product._id, product.ownerEmail)}
                  className={`cursor-pointer ${votedProducts[product._id] ? 'text-green-500' : 'text-gray-500'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
