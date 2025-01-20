import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import TrendingProducts from './TrendingProducts';
import { Helmet } from 'react-helmet-async';
import Contact from './Contact';
import CouponSection from './CouponSection';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <div>
                <Helmet>
                    <title> HUND Denmark || Home</title>
                </Helmet>
            </div>
            <Banner></Banner>
            <Featured></Featured>
            <TrendingProducts></TrendingProducts>
            <CouponSection></CouponSection>
            <Contact></Contact>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;