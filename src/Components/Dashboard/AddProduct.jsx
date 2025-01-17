import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../ImageBB/Utilist';
import useAuth from '../AuthProvider/useAuth';
import toast from 'react-hot-toast';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';
import { useQuery } from '@tanstack/react-query';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axioseSecure = useSecureAxiose();

  const { data: product = [] } = useQuery({
    queryKey: ['oneremail'],
    queryFn: async () => {
      const { data } = await axioseSecure.get(`/productssubscribe/${user?.email}`);
      return data;
    },
    onError: () => toast.error('Failed to fetch product data'),
  });
   console.log(product)
  const { data: users = {} } = useQuery({
    queryKey: ['userEmail'],
    queryFn: async () => {
      const { data } = await axioseSecure.get(`/userStatus/${user?.email}`);
      return data;
    },
    onError: () => toast.error('Failed to fetch user data'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onerEmail = product.length > 0;
    const userStatus = users?.status === 'pending';

    if (onerEmail && userStatus) {
      return toast.error('Please verify your account or product limit reached.');
    }

    const form = e.target;
    const productName = form.productName.value.trim();
    const description = form.description.value.trim();
    const tags = form.tags.value.trim();
    const externalLink = form.externalLink.value.trim();
    const ownerName = user?.displayName || 'Unknown';
    const ownerImage = user?.photoURL || '';
    const ownerEmail = user?.email || 'No email';
    const upvote = 0;
    const status = 'pending';

    const productImage = form.image.files[0];
    let productsImg = '';

    try {
      productsImg = await imageUpload(productImage);
    } catch (error) {
      return toast.error('Image upload failed. Please try again.');
    }

    const productsInfo = {
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
    };

    try {
      const { data } = await axioseSecure.post(`/products`, productsInfo);
      toast.success('Product added successfully!');
      navigate('/dadhboard/myProducts');
    } catch (err) {
      toast.error('Failed to add product. Try again.');
    }

    form.reset();
  };

  return (
    <div className="container mx-auto p-6 font-varela">
      <h1 className="text-2xl font-bold mb-6 text-center border-b-4 border-r-4 border-gray-700 w-fit p-3 rounded-lg mx-auto">
        Add Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#F5F5F5] shadow-xl text-gray-800 rounded-lg px-8 pt-6 pb-8 border border-gray-300"
      >
        {/* Product Name and Image */}
        <div className="md:flex items-center gap-6">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="productName" className="block text-sm font-semibold mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4 md:w-1/2">
            <label htmlFor="productImage" className="block text-sm font-semibold mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              name="image"
              className="file-input file-input-bordered bg-gray-100 border-gray-300 hover:border-green-500 border rounded w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Owner Info */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Owner Information:</h2>
          <p className="text-sm">Name: {user?.displayName || 'Unknown'}</p>
          <p className="text-sm">Email: {user?.email || 'No email'}</p>
        </div>

        {/* Tags and External Link */}
        <div className="md:flex items-center gap-6">
          <div className="mb-4 md:w-1/2">
            <label htmlFor="tags" className="block text-sm font-semibold mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter product tags"
              className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4 md:w-1/2">
            <label htmlFor="externalLink" className="block text-sm font-semibold mb-2">
              External Link
            </label>
            <input
              type="url"
              id="externalLink"
              name="externalLink"
              placeholder="Enter product website or landing page link"
              className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white w-full px-4 py-3 rounded-lg hover:bg-green-600 transition ease-in-out duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
