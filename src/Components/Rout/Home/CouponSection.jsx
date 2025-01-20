import React from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { CiCircleChevRight } from 'react-icons/ci';
import userRole from '../../hooks/userRole';
import toast from 'react-hot-toast';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import useAxiosePublic from '../../PublicAxiose/useAxiosePublic';
import {motion} from "framer-motion"
import {fadeIn}  from "../../Animation/variants"
const CouponSection = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosePublic();
  const [role] = userRole();

  const { data: coupons = [], isLoading, isError, error } = useQuery({
    queryKey: ['couponHome'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('api/coupons');
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error?.message || 'Failed to load coupons. Please try again later.'}</div>;

  const handleMyProfile = () => {
    if (role === 'users') {
      navigate('/dadhboard/myprofile');
    } else {
      toast.error('Access restricted to users only.');
    }
  };

  return (
    <div className="bg-[#BCE3C9] pb-32 px-2">
      <div className="container mx-auto">
        <Section titel="Discount Offer" description="All Coupons" />
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            // Responsive settings for Swiper
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {coupons.map((coupon) => (
            <SwiperSlide key={coupon._id}>
              <motion.div
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false,amount: 0.7}}
              className="card bg-[#F5F5F5] border shadow-2xl">
                <div className="card-body">
                  <h2 className="font-bold">Code: {coupon.code}</h2>
                  <p>{coupon.description}</p>
                  <p>Discount: $100 - ${coupon.amount}</p>
                  <p>Expiry Date: {new Date(coupon.date).toLocaleDateString()}</p>
                </div>
                <figure>
                  <img
                    className="h-44 object-cover"
                    src={coupon.imagecupon || '/placeholder.jpg'}
                    alt="Coupon"
                  />
                </figure>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={handleMyProfile}
          className="btn w-48 text-white mt-16 border-2 bg-[#3BB77E] hover:bg-[#3BB77E] flex mx-auto rounded-none varela"
        >
          Use Offer Coupon <CiCircleChevRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default CouponSection;
