import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import TrendingProducts from './TrendingProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;