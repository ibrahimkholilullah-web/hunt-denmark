import React, { useState } from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading';
import { Link } from 'react-router-dom';

const Featured = () => {
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products`);
      return data;
    },
  });

  // Local state to track votes for each product (whether it's upvoted or not)
  const [votedProducts, setVotedProducts] = useState({});

  // Function to handle the upvote toggle (upvote or downvote)
  const handleUpvote = async (id) => {
    const action = votedProducts[id] ? 'decrement' : 'increment'; // Toggle action
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_PROJECT_APT}/upVited/${id}`, { action });      
      // Toggle the vote state
      setVotedProducts((prev) => ({
        ...prev,
        [id]: action === 'increment' ? true : false, // Update to true if upvoted, false if downvoted
      }));
      
      refetch(); // Refetch products to update the UI
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handlevote = async (id) => {
    const action = votedProducts[id] ? 'decrement' : 'increment'; // Toggle action
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_PROJECT_APT}/downVited/${id}`, { action });      
      // Toggle the vote state
      setVotedProducts((prev) => ({
        ...prev,
        [id]: action === 'increment' ? true : false, // Update to true if upvoted, false if downvoted
      }));
      
      refetch(); // Refetch products to update the UI
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      <Section
        titel="New Add Products"
        description="Featured Products"
      ></Section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {products.slice(0, 4).map((product) => (
          <Link to={`/ditails/${product._id}`}
            key={product._id}
            className="border-2 border-black rounded-lg p-4 overflow-hidden flex justify-between items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Product Image */}
            <img
              className="w-6/12 h-36 object-cover"
              src={product.productsImg}
              alt={product.productName}
            />

            {/* Product Details */}'
            <div>
            <h1 className="text-lg font-semibold mb-2">{product.productName}</h1>
              <p className="bg-gray-200 text-sm text-center px-2 py-1 rounded-full inline-block mb-3">
                #{product.tags}
              </p>
            </div>
            <div className="p-4">
             
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold">{product.vote}</span>
                <div className="flex items-center gap-2 text-lg">
                  {/* Single button to toggle upvote/downvote */}
                  <FaCaretSquareDown size={25}
                    onClick={() => handlevote(product._id)} // Toggle upvote/downvote
                    className={`cursor-pointer text-red-800`}
                  />
                  <FaCaretSquareUp size={25}
                    onClick={() => handleUpvote(product._id)} // Toggle upvote/downvote
                    className={`cursor-pointer ${votedProducts[product._id] ? 'text-green-500' : 'text-gray-500'}`}
                  />
                </div>
                <span className="font-bold">{product.upvote}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
