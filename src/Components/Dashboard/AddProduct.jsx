import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../ImageBB/Utilist';
import useAuth from '../AuthProvider/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axioseSecure = useSecureAxiose()
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
        const {data} = await axioseSecure.post(`${import.meta.env.VITE_PROJECT_APT}/products`, productsInfo)
        console.log(data)
        form.reset()
        toast.success('Success Fully Add Peoduct')
        navigate('/dadhboard/myProducts')
      }
      catch(err){
        toast.error(err.message)
      }
      // Navigate to another page or show success message if needed
   
  };

  return (
    <div className="container mx-auto p-6 varela">
      <h1 className="text-2xl font-bold mb-4 text-center border-b-2 border-r-2 border-black w-60 varela p-2 rounded-lg mx-auto">
        Add Product
      </h1>
      <form onSubmit={handleSubmit} className="bg-[#939393] shadow-2xl text-black rounded px-8 pt-6 border-black border-2 pb-8 mb-4">
        {/* Product Name */}
      <div className='md:flex items-center gap-5'>
      <div className="mb-4 md:w-1/2">
          <label htmlFor="productName" className="block  text-sm font-bold mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border bg-blue-gray-50 text-sm rounded"
            required
          />
        </div>

        {/* Product Image */}
        <div className='md:w-1/2 '>
              <label className="form-control text-white w-full">
                <div className="label">
                  <span className="label-text text-black">Products Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name='image'
                  className="file-input mb-6 file-input-bordered bg-[#111827] border-white hover:border-yellow-400 border-2"
                />
                
              </label>
            </div>
      </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border bg-blue-gray-50 text-sm rounded"
            rows="4"
            required
          />
        </div>

        {/* Product Owner Info */}
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2">Owner Information:</label>
          <p className="">Name: {user?.displayName || 'Unknown'}</p>
          <p className="">Email: {user?.email || 'No email'}</p>
        </div>

       <div className='flex items-center gap-5'>
         {/* Tags */}
         <div className="mb-4 md:w-1/2">
          <label htmlFor="tags" className="block  text-sm font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter product tags"
            className="w-full px-3 py-2 bg-blue-gray-50 text-sm border rounded"
            required
          />
        </div>

        {/* External Link */}
        <div className="mb-4 md:w-1/2">
          <label htmlFor="externalLink" className="block text-sm font-bold mb-2">
            External Link
          </label>
          <input
            type="url"
            id="externalLink"
            name="externalLink"
            placeholder="Enter product website or landing page link"
            className="w-full px-3 py-2 border bg-blue-gray-50 text-sm rounded"
          />
        </div>

       </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#3BB77E] border-2 text-black w-full varela px-4 py-2 rounded hover:bg-[#3BB77E] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
