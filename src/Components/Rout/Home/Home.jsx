import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import TrendingProducts from './TrendingProducts';
import { Helmet } from 'react-helmet-async';
import Contact from './Contact';
import CouponSection from './CouponSection';

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
        </div>
    );
};

export default Home;