// Import necessary modules and dependencies
import React, { useState } from 'react';
import Loading from './Loading';
import useAuth from '../AuthProvider/useAuth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ProductsDItails = () => {
    const { user } = useAuth();
    const {id} = useParams()
    const {data : ditails={}, refetch, isLoading} = useQuery({
        queryKey:['ditails', id],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products/${id}`)
            return data
        }
    })
    if(isLoading) return <Loading></Loading>

    console.log(ditails)
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

 const {productName,
        productsImg,
        description,
        tags,
        externalLink,
        ownerImage,
        ownerName,
        ownerEmail,
        upvote,
        vote,
        status} = ditails
  return (
    <div className="p-6 bg-white shadow-2xl border border-black rounded-lg">
      <div className="mb-6 flex items-center gap-10 ">
        <img src={productsImg} className="w-full h-auto rounded-md" />
       <div>
       <h1 className="text-2xl font-bold mb-2">{productName}</h1>

<p className="mt-4 text-gray-700">{description}</p>
<div className="mt-4 flex flex-wrap gap-2">
  <span>{tags}</span>
</div>
<div className="mt-4 flex items-center gap-4">
  <button
    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
  >
    Upvote ({upvote})
  </button>
  <button
    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
  >
    Report
  </button>
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
