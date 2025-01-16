import axios from 'axios';
import React, { useState } from 'react';
import Loading from './Loading';
import useAuth from '../AuthProvider/useAuth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaRegThumbsUp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Report from './Report';
import { GiClick } from 'react-icons/gi';
import Section from './Section';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';

const ProductsDItails = () => {
    const axioseSecure = useSecureAxiose()
    const { user } = useAuth();
    const { id } = useParams();
    const [votedProducts, setVotedProducts] = useState({});
    const [reviewData, setReviewData] = useState({
        description: '',
        rating: 0,
    });

    const { data: ditails = {}, refetch, isLoading } = useQuery({
        queryKey: ['ditails', id],
        queryFn: async () => {
            const { data } = await axioseSecure.get(`/products/${id}`);
            return data;
        },
    });

    const {
        productName,
        productsImg,
        description,
        tags,
        externalLink,
        ownerImage,
        ownerName,
        ownerEmail,
        upvote,
        status,
        _id,
    } = ditails;

    const handleUpvote = async (id) => {
        if (user?.email === ownerEmail) {
            return toast.error('You cannot like your own product.');
        }
        const action = votedProducts[id] ? 'decrement' : 'increment'; // Toggle action
        try {
            await axios.patch(`${import.meta.env.VITE_PROJECT_APT}/upVoted/${id}`, { action });
            setVotedProducts((prev) => ({
                ...prev,
                [id]: action === 'increment' ? true : false,
            }));
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const review = {
            productId: _id,
            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            description: reviewData.description,
            rating: parseInt(reviewData.rating),
        };
        console.log(review)

        try {
            await axios.post(`${import.meta.env.VITE_PROJECT_APT}/reviews`, review);
            e.target.reset()
            toast.success('Review submitted successfully!');
        } catch (err) {
            toast.error('Failed to submit review: ' + err.message);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-2 bg-[#DBF2E8] varela">
            <div className="mb-6 md:flex md:flex-col items-center bg-[#F5F5F5] shadow-2xl rounded-lg gap-10 border border-black p-4 w-full md:w-8/12 mx-auto">
                <img src={productsImg} className="w-full md:w-4/12 h-auto rounded-md" alt="Product" />
                <div className="w-full">
                    <div className="md:flex justify-between items-center mb-4">
                        <div>
                        <div className='flex items-center gap-5'>
                        <img className="w-12 h-12 rounded-full" src={ownerImage} alt="Owner" />
                         <div>
                         <h1 className="text-2xl font-bold">{productName}</h1>
                         <p className="text-sm">{ownerName}</p>
                         </div>
                        </div>
                        <p className="text-sm mt-2 inline-flex items-center">
                            {ownerEmail}
                        </p>
                        <a
                            className="bg-blue-gray-50 px-2 ml-10 inline-flex  items-center gap-1 text-[12px] py-1 rounded-xl text-blue-700 hover:text-blue-900"
                            href={externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open Page <GiClick className='text-black' />

                        </a>
                        </div>
                        
                       
                    </div>
                    <p className="text-gray-700 mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-gray-200 px-2 py-1 rounded-full text-sm"># {tags}</span>
                      
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleUpvote(_id)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#54673B] text-white rounded-md hover:bg-green-900"
                        >
                            <FaRegThumbsUp /> ({upvote})
                        </button>
                        <button
                            onClick={() => document.getElementById('my_modal_3').showModal()}
                            className="px-4 py-2 bg-blue-gray-200 text-black font-bold rounded-md hover:bg-[#54673B]"
                        >
                            Report
                        </button>
                        <Report ditails={ditails} />
                    </div>
                    <div className="mt-6">
                        <Section titel='Provited a Review' description='Post a Review'></Section>

                        <form onSubmit={handleReviewSubmit} className="space-y-4 border-2 shadow-2xl p-2 rounded-xl">
                           
                            <div>
                                <label className="block text-sm font-medium">Reviewer Image</label>
                                <img src={user?.photoURL || ''} alt="Reviewer" className="w-12 h-12 rounded-full" />
                                <p className='text-sm pt-1'>{user?.displayName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Review Description</label>
                                <textarea
                                    value={reviewData.description}
                                    onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Write your review"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Rating</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={reviewData.rating}
                                    onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                                    className="input input-bordered w-full"
                                    placeholder="Rate (1-5)"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary bg-[#3BB77E] hover:bg-[#3BB77E] text-black border-none w-full"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDItails;
