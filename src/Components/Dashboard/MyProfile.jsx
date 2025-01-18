import { useState } from "react";
import useAuth from "../AuthProvider/useAuth";
import Loading from "../Shared/Loading";
import useSecureAxiose from "../useSecureAxiose/useSecureAxiose";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Payment/CheckoutForm";
import { Helmet } from "react-helmet-async";


const MyProfile = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_API_KEY_PAYMENT);

  const { user } = useAuth();
  const axioseSecure = useSecureAxiose();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const { data: profile = {}, isLoading, refetch } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const { data } = await axioseSecure.get(`/myprofile/${user?.email}`);
      return data;
    },
  });
  const { name, email, image, role,status, _id } = profile;

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6 mt-24">
           <Helmet>
              <title> HUND Denmark || My Profile</title>
            </Helmet>
      <div className="card bg-base-100 mx-auto flex w-96 shadow-xl">
        <figure>
          <img className="w-16 h-16 rounded-full mt-5" src={image} alt="Profile" />
        </figure>
        <p className="mx-auto bg-green-300 px-1 mt-2 text-sm rounded-xl">{role}</p>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{email}</p>
          
           {
            status === 'verify' ? <button className="bg-green-600 py-2 text-white rounded-xl">Verify</button> : <button onClick={()=>document.getElementById('my_modal_3').showModal()}
            className="text-black hover:border hover:border-black hover:bg-[#BCE3C9] px-8 bg-[#3BB77E] btn rounded-none"
          >
            Membership Subscribe $10
          </button>
           }
           
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 -top-0">
              ✕
            </button>
          </form>
          <div className="p-2 border-2 rounded-xl">
            <img src={image} className="w-12 rounded-full mx-auto h-12" alt="User" />
            <h1 className="text-sm text-center">{name}</h1>
            <p className="text-center text-sm pb-5">Payment $10</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm id={_id} refetch={refetch}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default MyProfile;
