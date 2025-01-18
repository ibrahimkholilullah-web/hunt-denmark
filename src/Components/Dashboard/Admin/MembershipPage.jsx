import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrendingCoupons from './TrendingCoupons';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import Loading from '../../Shared/Loading';
import { useQuery } from '@tanstack/react-query';

const MembershipPage = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const axioseSecure = useSecureAxiose()
    const {data: coupons=[], isLoading} = useQuery({
        queryKey:['couponHome'],
        queryFn: async () =>{
            const {data} = await axioseSecure.get('api/coupons')
            return data
        }
    })
    console.log('kholil', coupons)
    if(isLoading) return <Loading></Loading>

  const handleApplyCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    alert(`Coupon "${coupon.code}" applied successfully!`);
  };

  return (
    <div className="membership-page">
      <h1 className="text-3xl font-bold text-center my-6">
        Purchase Membership
      </h1>
      <TrendingCoupons coupons={coupons} onApplyCoupon={handleApplyCoupon} />
      {selectedCoupon && (
        <div className="p-4 mt-4 bg-blue-100 rounded text-center">
          <p className="text-lg font-semibold text-blue-700">
            Applied Coupon: {selectedCoupon.code}
          </p>
          <p className="text-gray-700">
            Discount Amount: {selectedCoupon.amount}%
          </p>
        </div>
      )}
      {/* Membership purchase section */}
      <div className="p-6 mt-6 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Buy Membership</h2>
        <p className="text-gray-600 mb-2">
          Base Price: <span className="font-bold">$100</span>
        </p>
        <p className="text-gray-600 mb-4">
          Final Price:{" "}
          <span className="font-bold">
            $
            {selectedCoupon
              ? 100 - (100 * selectedCoupon.amount) / 100
              : 100}
          </span>
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Purchase Now
        </button>
      </div>
    </div>
  );
};

export default MembershipPage;
