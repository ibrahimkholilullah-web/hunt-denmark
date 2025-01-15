// Import necessary modules and dependencies
import React, { useState } from 'react';
import Loading from './Loading';
import useAuth from '../AuthProvider/useAuth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaRegThumbsUp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductsDItails = () => {
    const { user } = useAuth();
    const {id} = useParams()
    const [votedProducts, setVotedProducts] = useState({});
    const {data : ditails={}, refetch, isLoading} = useQuery({
        queryKey:['ditails', id],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products/${id}`)
            return data
        }
    })
    const {productName,
        productsImg,
        description,
        tags,
        externalLink,
        ownerImage,
        ownerName,
        ownerEmail,
        upvote,
        status, _id} = ditails
      const handleUpvote = async (id) => {
        if(user?.email === ownerEmail){
            return toast.error('Your are a Not Like this Products .')
        }
        const action = votedProducts[id] ? 'decrement' : 'increment'; // Toggle action
        try {
          const { data } = await axios.patch(`${import.meta.env.VITE_PROJECT_APT}/upVited/${id}`, { action });      
          // Toggle the vote state
          setVotedProducts((prev) => ({
            ...prev,
            [id]: action === 'increment' ? true : false, 
          }));
          
          refetch(); // Refetch products to update the UI
        } catch (err) {
          toast.error(err.message);
        }
      };
      if(isLoading) return <Loading></Loading>

//    // Context for getting user info
//   const [reviewDescription, setReviewDescription] = useState('');
//   const [rating, setRating] = useState('');

//   const handleUpvote = () => {
//     console.log('Upvote functionality to be implemented');
//   };

//   const handleReport = () => {
//     console.log('Report functionality to be implemented');
//   };

//   const handleSubmitReview = async () => {
//     if (!reviewDescription || !rating) {
//       alert('Please fill out all fields.');
//       return;
//     }

//     const reviewData = {
//       reviewerName: user.name,
//       reviewerImage: user.image,
//       reviewDescription,
//       rating,
//       productId: product._id,
//     };

//     try {
//       const reviewCollection = collection(db, 'reviews');
//       await addDoc(reviewCollection, reviewData);
//       alert('Review submitted successfully!');
//       setReviewDescription('');
//       setRating('');
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review. Please try again.');
//     }
//   };

 
  return (
    <div className="p-2 ">
      <div className="">
      <div className="mb-6 flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg gap-10 border border-black p-4 w-full md:w-8/12 mx-auto">
        <img src={productsImg} className="w-full md:w-4/12 h-auto rounded-md" alt="Product" />
        <div className="w-full">
          <div className="md:flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{productName}</h1>
              <p className="text-sm">Owner: {ownerName}</p>
              <p className="text-sm">
                <span className="mr-2">Email:</span> {ownerEmail}
              </p>
            </div>
            <img className="w-12 h-12 rounded-full" src={ownerImage} alt="Owner" />
          </div>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm"># {tags}</span>
            <a
              className="bg-blue-gray-50 px-2 py-1 rounded-xl text-sm text-blue-700 hover:text-blue-900"
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Page
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => handleUpvote(_id)}
              className="flex items-center gap-2 px-4 py-2 bg-[#54673B] text-white rounded-md hover:bg-green-900"
            >
              <FaRegThumbsUp /> ({upvote})
            </button>
            <button
              className="px-4 py-2 bg-blue-gray-200 text-black font-bold rounded-md hover:bg-[#54673B]"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-medium">{review.reviewerName}</span>
              </div>
              <p className="text-gray-800 mb-2">{review.reviewDescription}</p>
              <span className="text-yellow-500">Rating: {review.rating} ⭐</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Post a Review</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitReview();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reviewer Name
            </label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reviewer Image
            </label>
            <input
              type="text"
              readOnly
              value={user.image}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Review Description
            </label>
            <textarea
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              min="1"
              max="5"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default ProductsDItails;
