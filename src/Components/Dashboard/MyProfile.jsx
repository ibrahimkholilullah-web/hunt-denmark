import React, { useState } from 'react';
import useAuth from '../AuthProvider/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Shared/Loading';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';

const MyProfile = () => {
  const { user } = useAuth();
  const axioseSecure = useSecureAxiose()
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const subscriptionAmount = 10;
    const {data : profile = {}, isLoading} = useQuery({
      queryKey : ['profile',user?.email],
      queryFn: async () =>{
        const {data} = await axioseSecure.get(`/myprofile/${user?.email}`)
        return data
      }
    })
    console.log(profile)
    const {name, email, image, role} = profile
  // Simulate Payment Success
  const handlePayment = () => {
    setIsSubscribed(true);
    setShowPaymentModal(false);
    // Add backend integration to save subscription status here
  };
 if(isLoading) return <Loading></Loading>
  return (
    <div className="container mx-auto p-6 mt-56 varela ">
      <div className="bg-gray-100 shadow-lg w-6/12 mx-auto rounded-lg p-6 text-center">
        {/* User's Image */}
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt="User"
          className="w-12 h-12 rounded-full mx-auto mb-4"
        />
        <h1 className='bg-green-400 rounded-lg w-32 mx-auto text-white'>{role}</h1>
        {/* User's Name */}
        <h1 className="text-2xl font-bold mb-2">{name || 'Guest User'}</h1>
        {/* User's Email */}
        <p className="text-gray-600 mb-4">{email || 'No email available'}</p>

        {/* Membership Subscription Button */}
        {!isSubscribed ? (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {`Subscribe for $${subscriptionAmount}`}
          </button>
        ) : (
          // Subscription Status
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
            <p>Status: Verified</p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-hidden={!showPaymentModal}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <p className="mb-6">
              Please pay ${subscriptionAmount} to subscribe to the membership.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
