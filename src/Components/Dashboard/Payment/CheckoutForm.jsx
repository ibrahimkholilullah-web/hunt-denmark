import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import useAuth from '../../AuthProvider/useAuth';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axioseSecure = useSecureAxiose();
    const { user } = useAuth();
    const totalPrices = 10
    const stripe = useStripe();
    const elements = useElements();

    if(totalPrices> 0){
        useEffect(() => {
            axioseSecure.post('/create-checkout-session', { price: totalPrices })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error('Error creating checkout session:', err));
        }, [axioseSecure, totalPrices]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (cardElement == null) {
            return;
        }

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (paymentError) {
            setError(paymentError.message);
            return;
        }

        setError('');
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
            return;
        }

        if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                price: totalPrices,
                name: user?.displayName,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: 'pending',
            };

            try {
              const res = await axioseSecure.post('/payment', payment);
              console.log('Payment saved:', res.data);
              const modal = document.getElementById('my_modal_3');
              if (modal && typeof modal.close === 'function') {
                  modal.close();
              } else {
                  console.error('Element is not a dialog or does not support close()');
              }
          } catch (err) {
              console.error('Error saving payment:', err);
          }
          
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
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
                <button type="submit" className="border p-2 bg-green-300" disabled={!stripe}>
                    Pay
                </button>
                <p className="text-red-700 text-sm">{error}</p>
                {transactionId && <p>Success! Payment ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
