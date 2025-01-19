import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import useAuth from '../../AuthProvider/useAuth';

const CheckoutForm = ({ id, refetch, couponPayment }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [totalPrices, setTotalPrices] = useState(100); // Default price
  const axioseSecure = useSecureAxiose();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Adjust price based on coupon
  useEffect(() => {
    if (couponPayment) {
      const discountMapping = {
        qyuerv1223: 30, // Replace with real variables
        jksdfjeio237376: 10,
        SHDIJIDJ2445IJD: 20,
        KSDIHKSD1234: 15,
      };

      const discount = discountMapping[couponPayment] || 0;
      setTotalPrices((prev) => Math.max(prev - discount, 0)); // Ensure price doesn't go below 0
    }
  }, [couponPayment]);

  // Create checkout session
  useEffect(() => {
    if (totalPrices > 0) {
      axioseSecure
        .post('/create-checkout-session', { price: totalPrices })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error('Error creating checkout session:', err));
    }
  }, [axioseSecure, totalPrices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || 'Anonymous',
            name: user?.name || 'Anonymous',
          },
        },
      });

      if (confirmError) {
        setError('Payment confirmation failed. Please try again.');
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        const payment = {
          email: user?.email,
          price: totalPrices,
          name: user?.displayName || 'Anonymous',
          transactionId: paymentIntent.id,
          date: new Date(),
          status: 'pending',
        };

        try {
          await axioseSecure.post('/payment', payment);
          await axioseSecure.patch(`/user/${id}`);
          refetch();

          const modal = document.getElementById('my_modal_3');
          if (modal && typeof modal.close === 'function') {
            modal.close();
          }
        } catch (err) {
          console.error('Error saving payment:', err);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="border-2 rounded-lg p-2"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <p className="text-center text-sm pb-5">Totle Payment  {totalPrices}</p>

        <button
          type="submit"
          className="text-white hover:border hover:border-black hover:bg-[#BCE3C9] px-8 bg-[#3BB77E] btn w-full my-2 rounded-lg"
          disabled={!stripe || loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            `Pay $${totalPrices}`
          )}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
