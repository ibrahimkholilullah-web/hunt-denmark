import React from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';
import TrendingCoupons from '../../Dashboard/Admin/TrendingCoupons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';

const CouponSection = () => {
    const axiosSecure = useSecureAxiose(); // Fixed typo
    const { data: coupons = [], isLoading, isError } = useQuery({
        queryKey: ['couponHome'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('api/coupons');
            return data;
        },
    });

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Failed to load coupons. Please try again later.</div>;

    return (
        <div className='bg-[#BCE3C9] pb-32'>
            <div className='container mx-auto'>
                <Section title='Discount Offer' description='All Coupons' />
                {coupons.length > 0 ? (
                    <Slider {...settings}>
                        {coupons.map((coupon) => (
                            <TrendingCoupons key={coupon._id} coupon={coupon} />
                        ))}
                    </Slider>
                ) : (
                    <div>No coupons available at the moment.</div>
                )}
            </div>
        </div>
    );
};

export default CouponSection;
