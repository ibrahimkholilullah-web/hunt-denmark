import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../AuthProvider/useAuth';
import Loading from '../Shared/Loading';
import toast from 'react-hot-toast';
import { imageUpload } from '../ImageBB/Utilist';

const UpdatePage = () => {
  const { user } = useAuth();
  const { id } = useParams();
const navigate = useNavigate()
  const { data: update = {}, isLoading } = useQuery({
    queryKey: ['update', id],
    queryFn: async () => {
      if (!id) throw new Error('Invalid product ID');
      const { data } = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products/${id}`);
      return data;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch product details.');
    },
  });

  if (isLoading) return <Loading />;

  const {
    productName = '',
    productsImg = '',
    description = '',
    tags = '',
    externalLink = '',
  } = update;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const productName = form.productName.value;
      const description = form.description.value;
      const tags = form.tags.value;
      const externalLink = form.externalLink.value;
      const productImage = form.image.files[0];

      let productsImgUrl = productsImg; // Use existing image if no new image is uploaded

      if (productImage) {
        try {
          productsImgUrl = await imageUpload(productImage);
        } catch (err) {
          return toast.error('Image upload failed. Please try again.');
        }
      }

      const productsInfo = {
        productName,
        description,
        tags,
        externalLink,
        productsImg: productsImgUrl,
      };
    console.log(productsInfo)
      const { data } = await axios.patch(
        `${import.meta.env.VITE_PROJECT_APT}/update/${id}`,
        productsInfo
      );
      navigate('/dadhboard/myProducts')
      toast.success('Product updated successfully.');

    } catch (error) {
      toast.error(error.message || 'Failed to update the product.');
    }
  };

  return (
    <div className='bg-[#E5F6EE]'>
      <div className="container mx-auto p-6 varela">
      <h1 className="text-2xl font-bold mb-4 text-center border-b-2 border-r-2 border-black w-60 p-2  rounded-lg mx-auto">
        Update Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#F5F5F5] shadow-2xl shadow-blue-gray-900 rounded px-8 pt-6 pb-8 mb-4 border-2"
      >
        <div className="md:flex items-center">
          <div className="mb-4 md:w-1/2 md:pr-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue={productName}
              id="productName"
              name="productName"
              placeholder="Enter product name"
              className="w-full px-3 py-2 text-sm border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="w-full px-3 py-2 border rounded"
            />
           
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            defaultValue={description}
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 text-sm border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            defaultValue={tags}
            name="tags"
            placeholder="Enter product tags"
            className="w-full px-3 py-2 text-sm border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="externalLink" className="block text-gray-700 text-sm font-bold mb-2">
            External Link
          </label>
          <input
            type="url"
            defaultValue={externalLink}
            id="externalLink"
            name="externalLink"
            placeholder="Enter product website or landing page link"
            className="w-full px-3 text-sm py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-[#6DB87E] w-full text-black px-4 py-2 rounded hover:bg-[#6DB87E] transition"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdatePage;
