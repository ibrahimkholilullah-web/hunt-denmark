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
  const [couponPayment, setCouponPayment] = useState("");

  const { data: profile = {}, isLoading, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    queryFn: async () => {
      const { data } = await axioseSecure.get(`/myprofile/${user?.email}`);
      return data;
    },
  });

  const { name, email, image, role, status, _id } = profile;

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6 mt-24">
      <Helmet>
        <title>HUND Denmark || My Profile</title>
      </Helmet>

      <div className="card bg-base-100 mx-auto flex flex-col items-center w-full max-w-lg shadow-xl md:flex-row md:max-w-3xl lg:max-w-4xl">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            className="w-24 h-24 border border-[#3BB77E] p-1 rounded-full mt-5 md:w-32 md:h-32"
            src={image}
            alt="Profile"
          />
        </div>
        <div className="card-body w-full md:w-2/3 p-4">
          <p className="mx-auto bg-green-300 px-2 py-1 text-sm rounded-xl text-center mb-2 md:mb-4 md:mx-0">
            {role}
          </p>
          <h2 className="card-title text-center md:text-left">{name}</h2>
          <p className="text-center md:text-left">{email}</p>
          <div className="mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                type="text"
                onChange={(e) => setCouponPayment(e.target.value)}
                className="input  w-full"
                placeholder="Coupon Code Use"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-center md:justify-start">
            {status === "verify" ? (
              <button className="bg-green-600 py-2 px-4 text-white rounded-xl">
                Verified
              </button>
            ) : (
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="text-white w-full hover:border hover:border-black hover:bg-[#BCE3C9] px-8 bg-[#3BB77E] btn rounded-none"
              >
                Membership Subscribe
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-sm md:max-w-md lg:max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 -top-0">
              ✕
            </button>
          </form>
          <div className="p-2 border-2 rounded-xl">
            <div className="flex justify-center mb-4">
              <img
                src={image}
                className="w-16 rounded-full mx-auto h-16"
                alt="User"
              />
            </div>
            <h1 className="text-sm text-center mb-4">{name}</h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                id={_id}
                refetch={refetch}
                couponPayment={couponPayment}
              />
            </Elements>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
