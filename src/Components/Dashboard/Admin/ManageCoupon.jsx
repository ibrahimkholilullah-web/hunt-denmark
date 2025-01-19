// CouponPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import useSecureAxiose from "../../useSecureAxiose/useSecureAxiose";
import toast from "react-hot-toast";
import { imageUpload } from "../../ImageBB/Utilist";
import { useQuery } from "@tanstack/react-query";
import CuoponModel from "./CuoponModel";
import useAxiosePublic from "../../PublicAxiose/useAxiosePublic";

const ManageCoupon = () => {
  const axioseSecure = useSecureAxiose()
  const axiosePublic = useAxiosePublic()
  const [cuopon, setCuopon] = useState({})
  const [loading , setLoading] = useState(false)
  const handleAddCoupon = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target;
    const code = form.couponcode.value
    const date = form.date.value
    const amount = form.amount.value
    const image = form.image.files[0]
    const description = form.description.value
    const imagecupon = await imageUpload(image)
    const addCoupons = {
      code,date,amount,description,imagecupon
    }
    console.log(addCoupons)
    
    try {
      const {data} = await axioseSecure.post("/api/coupons", addCoupons);
     console.log(data)
      toast.success("Coupon added successfully!");
      form.reset()
      refetch()
    } catch (error) {
      console.error("Error adding coupon:", error);
      setMessage("Failed to add coupon.");
    }finally{
      setLoading(false)
    }
  };
  const {data: cuopons =[], refetch} = useQuery({
    queryKey: ['cuopon'],
    queryFn: async () =>{
      const {data} = await axiosePublic.get('/api/coupons')
      return data
    }
  })
  console.log(cuopons)
 const handeleteCuopon = async id =>{
  try{
    await axioseSecure.delete(`/cuopon/${id}`)
    toast.success("Delete Cuopon.")
    refetch()
  }catch (err){
    toast.error(err.message)
  }
 }
  const handleSignleCoupon = async id =>{
    try{
    const {data} =  await axioseSecure.get(`/cuopon/${id}`)
    setCuopon(data)
    }
    catch(err){
      toast.error(err.message)
    }
  }
 

  return (
   <div className="md:ml-2">
     <div className="flex flex-col rounded-xl items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

      <div className="mb-6 w-full ">
        <h2 className="text-lg font-semibold mb-2">Add New Coupon</h2>
        <form onSubmit={handleAddCoupon} className="space-y-4">
          <div className="flex items-center gap-5"> 
          <input
            type="text"
            name="couponcode"
            required
            placeholder="Coupon Code"
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#3BB77E]"
          />
           <input
             type="date"
             name="date"
             className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#3BB77E]"
           />
          </div>
          <div className="flex items-center gap-5">
          <input
            type="number"
            name="amount"
            required
            placeholder="Discount Amount"
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#3BB77E]"
          />
          <input
              type="file"
              id="productImage"
              accept="image/*"
              name="image"
              className="file-input file-input-bordered bg-gray-100 border-gray-300 hover:border-green-500 border rounded w-full"
            />
          </div>
          <textarea
            placeholder="Coupon Description"
            name="description"
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#3BB77E]"
          ></textarea>
         
          <button
            className="w-full px-4 py-2 bg-[#3BB77E] text-white rounded hover:bg-[#3BB77E]"
          >
            {
              loading ? <span className="loading loading-spinner loading-md"></span> : 'Add Coupon'

            }
            
          </button>
        </form>
      </div>

      

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Available Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cuopons.map((coupon) => (
            <div
              key={coupon._id}
              className="p-4 bg-white rounded-md shadow space-y-2 border border-[#3BB77E]"
            >
              <h3 className="font-bold text-lg">{coupon.code}</h3>
              <p className="style-new text-sm"><strong>Description:</strong> {coupon.description}</p>
              <img className="h-44 object-cover mx-auto" src={coupon.imagecupon} alt="" />
              <p><strong>Expiry Date:</strong> {coupon.date}</p>
              <p className=""><strong>Discount:</strong> ${coupon.amount}</p>
              <div className="flex space-x-2">
              <button
                   onClick={() => {
                     document.getElementById('my_modal_3').showModal(); // Call the `showModal` function
                     handleSignleCoupon(coupon._id); // Call the `handleSignleCoupon` function
                   }}
                   className="px-4 py-2 bg-[#3BB77E] text-white rounded hover:bg-[#3BB77E]"
                 >
                   Edit
                 </button>
                <button
                onClick={() =>handeleteCuopon(coupon._id)}
                  className="px-4 py-2 bg-[#5CB360] text-white rounded hover:bg-[#3BB77E]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   <CuoponModel cuopon={cuopon} refetch={refetch}></CuoponModel>
   </div>
  );
};

export default ManageCoupon;
