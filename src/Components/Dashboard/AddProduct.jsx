import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../ImageBB/Utilist';
import useAuth from '../AuthProvider/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const productName = form.productName.value;
    const description = form.description.value;
    const tags = form.tags.value;
    const externalLink = form.externalLink.value;
    const ownerName = user?.displayName || 'Unknown';
    const ownerImage = user?.photoURL || '';
    const ownerEmail = user?.email || 'No email';
    const upvote = 0;
    const vote = 0;
    const status = 'pending'
    // Get the product image
    const productImage = form.image.files[0];

    // Save the image and retrieve the URL
      const productsImg = await imageUpload(productImage);

      // Create the product object
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
        vote,
        status
      };

      console.log(productsInfo);
      try{
        const {data} = await axios.post(`${import.meta.env.VITE_PROJECT_APT}/products`, productsInfo)
        console.log(data)
        form.reset()
        toast.success('Success Fully Add Peoduct')

      }
      catch(err){
        toast.error(err.message)
      }
      // Navigate to another page or show success message if needed
   
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Product Image */}
        <div>
              <label className="form-control text-white w-full">
                <div className="label">
                  <span className="label-text">Products Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name='image'
                  className="file-input file-input-bordered bg-[#111827] border-white hover:border-yellow-400 border-2"
                />
                
              </label>
            </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          />
        </div>

        {/* Product Owner Info */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Owner Information:</label>
          <p className="text-gray-500">Name: {user?.displayName || 'Unknown'}</p>
          <p className="text-gray-500">Email: {user?.email || 'No email'}</p>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter product tags"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* External Link */}
        <div className="mb-4">
          <label htmlFor="externalLink" className="block text-gray-700 text-sm font-bold mb-2">
            External Link
          </label>
          <input
            type="url"
            id="externalLink"
            name="externalLink"
            placeholder="Enter product website or landing page link"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
