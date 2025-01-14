import React, { useState } from 'react';
import useAuth from '../AuthProvider/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const subscriptionAmount = 10;

  // Simulate Payment Success
  const handlePayment = () => {
    setIsSubscribed(true);
    setShowPaymentModal(false);
    // Add backend integration to save subscription status here
  };

  return (
    <div className="container mx-auto p-6 mt-56 ">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 text-center">
        {/* User's Image */}
        <img
          src={user?.photoURL || 'https://via.placeholder.com/150'}
          alt="User"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        {/* User's Name */}
        <h1 className="text-2xl font-bold mb-2">{user?.displayName || 'Guest User'}</h1>
        {/* User's Email */}
        <p className="text-gray-600 mb-4">{user?.email || 'No email available'}</p>

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
