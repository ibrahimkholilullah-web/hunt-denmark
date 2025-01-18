import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Payment/CheckoutForm';
import useAuth from '../../AuthProvider/useAuth';

const TrendingCoupons = ({ coupon }) => {
 
  return (
          <div
            className="p-4 border border-gray-200 rounded-lg shadow-md bg-white flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{coupon.code}</h3>
            <p className="text-gray-700 mb-1">
              Discount: <span className="font-bold">{coupon.amount}%</span>
            </p>
            <p className="text-gray-700 mb-1">
              Expiry: <span className="font-bold">{new Date(coupon.date).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-500 italic mb-4">{coupon.description}</p>
            <button
              onClick={() => handleCouponCode(coupon._id, coupon.code, coupon.amount)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Apply Coupon
            </button>
          </div>
    
  );
};

export default TrendingCoupons;
